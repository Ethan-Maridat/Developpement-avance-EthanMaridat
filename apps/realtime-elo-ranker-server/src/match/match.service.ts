import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private playerService: PlayerService,
  ) {}

  async createMatch(
    loser: Player,
    winner: Player,
    draw: boolean,
  ): Promise<Match> {
    const match = this.matchRepository.create({ loser, winner, draw });
    return this.matchRepository.save(match);
  }
}
