import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { RankingEventsService } from '../ranking/ranking.events.service'; // Importer le service d'événements
import { RankingUpdate } from '../ranking/ranking.update'; // Importer le type d'événement
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private playerService: PlayerService,
    private rankingEventsService: RankingEventsService, // Injecter le service d'événements
    private eventEmitter: EventEmitter2,
  ) { }

  private calculateElo(ratingA: number, ratingB: number, scoreA: number, scoreB: number): [number, number] {
    const K = 32;  // Coefficient de pondération
    const probabilityA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400)); // Probabilité de victoire de A
    const probabilityB = 1 - probabilityA; // Probabilité de victoire de B

    // Nouveau classement
    const newRatingA = Math.round(ratingA + K * (scoreA - probabilityA));
    const newRatingB = Math.round(ratingB + K * (scoreB - probabilityB));

    return [newRatingA, newRatingB];
  }

  async createMatch(
    loserId: string,
    winnerId: string,
    draw: boolean,
  ): Promise<Match> {
    const loserPlayer = await this.playerService.findOne(loserId);
    const winnerPlayer = await this.playerService.findOne(winnerId);

    if (!loserPlayer || !winnerPlayer) {
      throw new Error('Player not found');
    }

    // Déterminer les scores pour les joueurs
    const scoreWinner = draw ? 0.5 : 1;
    const scoreLoser = draw ? 0.5 : 0;

    // Calculer les nouveaux classements des joueurs
    const [newRankWinner, newRankLoser] = this.calculateElo(
      winnerPlayer.rank,
      loserPlayer.rank,
      scoreWinner,
      scoreLoser,
    );

    // Mettre à jour les classements des joueurs
    winnerPlayer.rank = newRankWinner;
    loserPlayer.rank = newRankLoser;

    // Sauvegarder les joueurs avec leurs nouveaux classements
    await this.playerService.update(winnerPlayer);
    await this.playerService.update(loserPlayer);

    // Émettre un événement de mise à jour du classement
    console.log('Émission de l’événement updated-ranking', winnerPlayer.id, winnerPlayer.rank);
    this.eventEmitter.emit('updated-ranking', new RankingUpdate(winnerPlayer.id, winnerPlayer.rank));

    console.log('Émission de l’événement updated-ranking', loserPlayer.id, loserPlayer.rank);
    this.eventEmitter.emit('updated-ranking', new RankingUpdate(loserPlayer.id, loserPlayer.rank));

    // Créer le match
    const match = this.matchRepository.create({
      loser: loserPlayer,
      winner: winnerPlayer,
      draw,
    });

    return this.matchRepository.save(match);
  }
}
