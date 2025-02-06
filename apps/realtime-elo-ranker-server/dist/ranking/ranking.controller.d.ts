import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getClassement(): Observable<MessageEvent>;
    getRanking(): Promise<import("../player/player.entity").Player[]>;
}
