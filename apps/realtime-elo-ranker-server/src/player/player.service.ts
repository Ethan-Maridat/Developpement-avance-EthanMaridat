import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { EloService } from '../elo/elo.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eloService: EloService,
  ) {}

  // Créer un joueur avec classement initial
  async createPlayer(): Promise<Player> {
    const initialElo = await Player.calculateInitialElo(this.playerRepository);
    const newPlayer = this.playerRepository.create({ eloRating: initialElo });
    return this.playerRepository.save(newPlayer);
  }

  // Mettre à jour le classement Elo d'un joueur après un match
  async updateElo(player: Player, opponent: Player, result: string): Promise<void> {
    const { playerNewElo, opponentNewElo } = this.eloService.calculateElo(player, opponent, result);
    player.eloRating = playerNewElo;
    opponent.eloRating = opponentNewElo;
    await this.playerRepository.save(player);
    await this.playerRepository.save(opponent);
  }
}
