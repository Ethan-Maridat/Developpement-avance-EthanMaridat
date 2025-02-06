import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Player } from '../player/player.entity';
export declare class RankingService {
    private rankingRepository;
    private playerRepository;
    private readonly K;
    constructor(rankingRepository: Repository<Ranking>, playerRepository: Repository<Player>);
    getRanking(): Promise<Ranking[]>;
    updateRanking(winnerName: string, loserName: string): Promise<void>;
}
