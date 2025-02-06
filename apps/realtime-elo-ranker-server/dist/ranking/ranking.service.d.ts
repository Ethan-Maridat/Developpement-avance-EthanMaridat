import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
export declare class RankingService {
    private playerRepository;
    private readonly K;
    constructor(playerRepository: Repository<Player>);
    getRanking(): Promise<Player[]>;
}
