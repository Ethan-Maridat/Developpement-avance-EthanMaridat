import { HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    findAll(): Promise<import("./player.entity").Player[]>;
    findOne(id: string): Promise<import("./player.entity").Player | null>;
    create(id: string): Promise<{
        code: HttpStatus;
        message: string;
        id?: undefined;
        rank?: undefined;
    } | {
        id: string;
        rank: number;
        code?: undefined;
        message?: undefined;
    }>;
}
