import { PlayerService } from '../player/player.service';
interface Match {
    id: number;
    player1: number;
    player2: number;
    winner: number;
}
export declare class MatchService {
    private readonly playerService;
    private matches;
    private idCounter;
    constructor(playerService: PlayerService);
    getAllMatches(): Match[];
    addMatch(player1: number, player2: number, winner: number): Match;
}
export {};
