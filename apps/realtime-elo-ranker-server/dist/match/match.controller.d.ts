import { HttpStatus } from '@nestjs/common';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
export declare class MatchController {
    private readonly matchService;
    private readonly playerService;
    constructor(matchService: MatchService, playerService: PlayerService);
    create(matchData: {
        loser: string;
        winner: string;
        draw: boolean;
    }): Promise<import("./match.entity").Match | {
        code: HttpStatus;
        message: string;
    }>;
}
