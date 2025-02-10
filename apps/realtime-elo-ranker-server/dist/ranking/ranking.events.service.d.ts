import { Observable } from 'rxjs';
import { RankingUpdate } from './ranking.update';
export declare class RankingEventsService {
    private rankingSubject;
    getRankingEvents(): Observable<RankingUpdate>;
    emitRankingUpdate(rankingData: RankingUpdate): void;
}
