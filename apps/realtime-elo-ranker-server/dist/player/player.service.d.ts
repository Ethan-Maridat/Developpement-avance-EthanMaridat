import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
    create(id: string): Promise<Player>;
}
