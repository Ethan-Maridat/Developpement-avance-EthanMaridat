import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getAllPlayers(): import("./player.service").Player[];
    addPlayer(name: string): import("./player.service").Player;
    updatePlayerScore(id: number, score: number): import("./player.service").Player | null;
}
