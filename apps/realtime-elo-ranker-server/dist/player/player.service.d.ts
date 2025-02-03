export interface Player {
    id: number;
    name: string;
    score: number;
}
export declare class PlayerService {
    private players;
    private idCounter;
    getAllPlayers(): Player[];
    addPlayer(name: string): Player;
    updatePlayerScore(id: number, score: number): Player | null;
}
