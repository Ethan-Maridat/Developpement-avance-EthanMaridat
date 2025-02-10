import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';

@Controller('/api/match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private readonly playerService: PlayerService,
  ) {}

  @Post()
  async create(@Body() matchData: { loser: string; winner: string; draw: boolean }) {

    if (!matchData.loser || matchData.loser === '') {
      return {
          code: HttpStatus.BAD_REQUEST, 
          message: 'L\'identifiant du joueur perdant est manquant.' 
      };
    }

    if (!matchData.winner || matchData.winner === '') {
      return {
          code: HttpStatus.BAD_REQUEST, 
          message: 'L\'identifiant du joueur gagnant est manquant.' 
      };
    }

    if (matchData.loser === matchData.winner) {
      return {
          code: HttpStatus.BAD_REQUEST, 
          message: 'Le joueur gagnant et le joueur perdant ne peuvent pas être les mêmes.' 
      };
    }

    const existLoser = await this.playerService.findOne(matchData.loser);
    const existWinner = await this.playerService.findOne(matchData.winner);
    if (!existLoser || !existWinner) {
      return {
          code: HttpStatus.BAD_REQUEST, 
          message: 'Le joueur gagnant ou perdant n\'existe pas.' 
      };
    }


    return this.matchService.createMatch(
      matchData.loser,
      matchData.winner,
      matchData.draw,
    );
  }
}
