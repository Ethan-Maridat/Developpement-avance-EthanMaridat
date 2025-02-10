import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async getRanking(): Promise<Player[]> {
    return this.playerRepository.find({
      order: {
        rank: 'DESC', // Trier par classement décroissant
      },
    });
  }
}
