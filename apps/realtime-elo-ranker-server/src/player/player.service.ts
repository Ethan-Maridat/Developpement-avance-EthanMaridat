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

  async findOne(name: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ name });
    if (!player) {
      throw new Error(`Player with name ${name} not found`);
    }
    return player;
  }

  async create(name: string): Promise<Player> {
    const player = this.playerRepository.create({ name });
    return this.playerRepository.save(player);
  }
}
