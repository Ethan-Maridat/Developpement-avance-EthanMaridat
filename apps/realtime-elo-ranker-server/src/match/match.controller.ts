import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { Player } from 'src/player/player.entity';

@Controller('api/matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() matchData: { loser: Player; winner: Player; draw: boolean }) {
    return this.matchService.createMatch(
      matchData.loser,
      matchData.winner,
      matchData.draw,
    );
  }
}
