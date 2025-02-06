import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    findAll(): Promise<import("./player.entity").Player[]>;
    findOne(id: string): Promise<import("./player.entity").Player>;
    create(id: string): Promise<import("./player.entity").Player>;
}
