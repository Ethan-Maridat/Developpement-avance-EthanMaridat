import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private playerRepository;
    private eventEmitter;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    create(id: string): Promise<Player>;
    update(player: Player): Promise<Player>;
}
