import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';

@Injectable()
export class RankingService {
  private readonly K = 32; // Facteur de sensibilité du ranking

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async getRanking(): Promise<Player[]> {
    return this.playerRepository.find();
  }
}
