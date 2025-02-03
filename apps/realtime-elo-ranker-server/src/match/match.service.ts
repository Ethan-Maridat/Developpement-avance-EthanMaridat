import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerService } from '../player/player.service';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private playerService: PlayerService,
  ) {}

  // Créer un match entre deux joueurs et mettre à jour leurs classements Elo
  async createMatch(player1: Player, player2: Player, result: 'win' | 'lose' | 'draw'): Promise<Match> {
    const match = this.matchRepository.create({ player1, player2, result });
    await this.matchRepository.save(match);
    await this.playerService.updateElo(player1, player2, result);
    return match;
  }
}
