import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getClassement(): Observable<MessageEvent>;
    updateRanking(winnerName: string, loserName: string): Promise<{
        message: string;
    }>;
    getRanking(): Promise<import("./ranking.entity").Ranking[]>;
}
