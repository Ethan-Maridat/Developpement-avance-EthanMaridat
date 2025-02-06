import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';
export declare class MatchService {
    private matchRepository;
    private playerService;
    constructor(matchRepository: Repository<Match>, playerService: PlayerService);
    createMatch(loser: Player, winner: Player, draw: boolean): Promise<Match>;
}
