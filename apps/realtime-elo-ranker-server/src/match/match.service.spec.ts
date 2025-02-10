import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { RankingEventsService } from '../ranking/ranking.events.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from '../player/player.entity';

describe('MatchService', () => {
  let service: MatchService;
  let matchRepository: Repository<Match>;
  let playerService: PlayerService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Match),
          useClass: Repository,
        },
        {
          provide: PlayerService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: RankingEventsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    playerService = module.get<PlayerService>(PlayerService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('createMatch', () => {
    it('devrait créer un match et mettre à jour le classement', async () => {
      const winner: Player = { id: '1', rank: 1500, matches: [] };
      const loser: Player = { id: '2', rank: 1400, matches: [] };
      
      jest.spyOn(playerService, 'findOne').mockImplementation(async (id: string) => {
        return id === '1' ? winner : id === '2' ? loser : null;
      });
      jest.spyOn(playerService, 'update').mockResolvedValue(winner);
      jest.spyOn(matchRepository, 'create').mockReturnValue({} as Match);
      jest.spyOn(matchRepository, 'save').mockResolvedValue({} as Match);

      const result = await service.createMatch('2', '1', false);
      
      expect(playerService.findOne).toHaveBeenCalledTimes(2);
      expect(playerService.update).toHaveBeenCalledTimes(2);
      expect(eventEmitter.emit).toHaveBeenCalledTimes(2);
      expect(matchRepository.create).toHaveBeenCalled();
      expect(matchRepository.save).toHaveBeenCalled();
    });

    it('devrait lancer une erreur si un joueur est introuvable', async () => {
      jest.spyOn(playerService, 'findOne').mockResolvedValue(null);
      
      await expect(service.createMatch('2', '1', false)).rejects.toThrow('Player not found');
    });
  });
});
