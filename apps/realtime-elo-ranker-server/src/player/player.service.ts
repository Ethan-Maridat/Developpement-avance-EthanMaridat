import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingUpdate } from '../ranking/ranking.update';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id }) || null;
  }
  

  async create(id: string): Promise<Player> {
    const player = this.playerRepository.create({ id, rank: 300 });  // Assurer que rank est défini à 0
    this.eventEmitter.emit('updated-ranking', new RankingUpdate(player.id, player.rank));  // Émettre un événement de mise à jour du classement
    return this.playerRepository.save(player);
  }

  async update(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }
  
}
