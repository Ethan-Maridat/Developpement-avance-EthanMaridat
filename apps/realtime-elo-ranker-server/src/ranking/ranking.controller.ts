import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingEventsService } from './ranking.events.service'; 
import { map, Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common'; // Utiliser MessageEvent de NestJS

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly rankingEventsService: RankingEventsService,
  ) {}

  @Get()
  async getRanking() {
    return this.rankingService.getRanking();  // Retourne les joueurs triés par rang
  }

  @Get('events')
  @Sse()
  rankingEvents(): Observable<MessageEvent> {
    console.log('Client SSE connecté');
    return this.rankingEventsService.getRankingEvents().pipe(
      map((data) => {
        console.log('Envoi d’un événement SSE:', data);
        return {
          data: JSON.stringify({
            type: 'RankingUpdate',
            player: {
              id: data.id,
              rank: data.rank,
            }
          })
        };
      }),
    );
  }
}
