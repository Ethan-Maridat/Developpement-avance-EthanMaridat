import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id });
    if (!player) {
      throw new Error(`Player with name ${id} not found`);
    }
    return player;
  }

  async create(id: string): Promise<Player> {
    const player = this.playerRepository.create({ id, rank: 0 });  // Assurer que rank est défini à 0
    return this.playerRepository.save(player);
  }
}
