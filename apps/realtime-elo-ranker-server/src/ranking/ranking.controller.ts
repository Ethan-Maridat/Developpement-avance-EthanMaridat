import { Controller, Post, Body, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Sse('events')
  getClassement(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => new MessageEvent('message', { data: 'Classement mis à jour' })),
    );
  }

  @Post('update')
  async updateRanking(
    @Body('winnerId') winnerName: string,
    @Body('loserId') loserName: string,
  ) {
    await this.rankingService.updateRanking(winnerName, loserName);
    return { message: 'Ranking mis à jour' };
  }

  @Get()
  async getRanking() {
    return this.rankingService.getRanking();
  }
}
