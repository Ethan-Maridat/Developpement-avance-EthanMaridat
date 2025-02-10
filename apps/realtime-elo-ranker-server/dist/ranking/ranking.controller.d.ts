import { RankingService } from './ranking.service';
import { RankingEventsService } from './ranking.events.service';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
export declare class RankingController {
    private readonly rankingService;
    private readonly rankingEventsService;
    constructor(rankingService: RankingService, rankingEventsService: RankingEventsService);
    getRanking(): Promise<import("../player/player.entity").Player[]>;
    rankingEvents(): Observable<MessageEvent>;
}
