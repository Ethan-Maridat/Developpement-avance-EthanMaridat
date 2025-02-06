import { MatchService } from './match.service';
import { Player } from 'src/player/player.entity';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    create(matchData: {
        loser: Player;
        winner: Player;
        draw: boolean;
    }): Promise<import("./match.entity").Match>;
}
