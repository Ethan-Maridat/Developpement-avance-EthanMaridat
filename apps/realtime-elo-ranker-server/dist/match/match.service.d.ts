import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { RankingEventsService } from '../ranking/ranking.events.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchService {
    private matchRepository;
    private playerService;
    private rankingEventsService;
    private eventEmitter;
    constructor(matchRepository: Repository<Match>, playerService: PlayerService, rankingEventsService: RankingEventsService, eventEmitter: EventEmitter2);
    private calculateElo;
    createMatch(loserId: string, winnerId: string, draw: boolean): Promise<Match>;
}
