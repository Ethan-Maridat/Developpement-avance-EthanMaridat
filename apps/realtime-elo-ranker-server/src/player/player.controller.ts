import { Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  // Créer un joueur
  @Post()
  async createPlayer(): Promise<Player> {
    return this.playerService.createPlayer();
  }
}
