import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class RankingService {
  private readonly K = 32; // Facteur de sensibilité du ranking

  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async getRanking(): Promise<Ranking[]> {
    return this.rankingRepository.find();
  }

  async updateRanking(winnerName: string, loserName: string): Promise<void> {
    const winner = await this.playerRepository.findOne({
      where: { id: winnerName },
    });
    const loser = await this.playerRepository.findOne({
      where: { id: loserName },
    });

    if (!winner || !loser) {
      throw new Error('Les joueurs spécifiés ne sont pas trouvés');
    }

    const winnerRanking = await this.rankingRepository.findOne({
      where: { player: winner },
    });
    const loserRanking = await this.rankingRepository.findOne({
      where: { player: loser },
    });

    if (!winnerRanking || !loserRanking) {
      throw new Error('Les rankings des joueurs ne sont pas trouvés');
    }

    const WeWinner =
      1 / (1 + Math.pow(10, (loserRanking.rank - winnerRanking.rank) / 400));
    const WeLoser =
      1 / (1 + Math.pow(10, (winnerRanking.rank - loserRanking.rank) / 400));

    winnerRanking.rank = Math.round(
      winnerRanking.rank + this.K * (1 - WeWinner),
    );
    loserRanking.rank = Math.round(loserRanking.rank + this.K * (0 - WeLoser));

    await this.rankingRepository.save([winnerRanking, loserRanking]);
  }
}
