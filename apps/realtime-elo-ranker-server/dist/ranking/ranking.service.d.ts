import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
export declare class RankingService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    getRanking(): Promise<Player[]>;
}
