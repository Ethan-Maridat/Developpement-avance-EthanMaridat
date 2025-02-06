import { Match } from '../match/match.entity';
import { Ranking } from '../ranking/ranking.entity';
export declare class Player {
    id: string;
    rank: Ranking;
    matches: Match[];
}
