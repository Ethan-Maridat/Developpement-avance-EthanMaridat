import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { Player } from '../player/player.entity';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  // Créer un match entre deux joueurs
  @Post()
  async createMatch(
    @Body() body: { player1Id: number, player2Id: number, result: 'win' | 'lose' | 'draw' }
  ) {
    const player1 = await this.playerService.findOne(body.player1Id);
    const player2 = await this.playerService.findOne(body.player2Id);
    return this.matchService.createMatch(player1, player2, body.result);
  }
}
