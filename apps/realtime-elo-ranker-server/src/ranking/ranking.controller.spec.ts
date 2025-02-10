import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { RankingEventsService } from './ranking.events.service';
import { of } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';

describe('RankingController', () => {
  let controller: RankingController;
  let rankingService: RankingService;
  let rankingEventsService: RankingEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: { getRanking: jest.fn() }, // Mock de RankingService
        },
        {
          provide: RankingEventsService,
          useValue: { getRankingEvents: jest.fn() }, // Mock de RankingEventsService
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
    rankingEventsService = module.get<RankingEventsService>(RankingEventsService);
  });

  describe('getRanking', () => {
    it('should return the ranking list', async () => {
      const mockPlayers = [
        { id: '1', rank: 300, matches: [] },
        { id: '2', rank: 250, matches: [] },
      ];
      jest.spyOn(rankingService, 'getRanking').mockResolvedValue(mockPlayers);

      const result = await controller.getRanking();

      expect(result).toBe(mockPlayers);
      expect(rankingService.getRanking).toHaveBeenCalled();
    });
  });

  describe('rankingEvents', () => {
    it('should return SSE events', (done) => {
      const mockEvent = { id: '1', rank: 300 };
      const mockObservable = of(mockEvent);
      jest.spyOn(rankingEventsService, 'getRankingEvents').mockReturnValue(mockObservable);

      controller.rankingEvents().subscribe((event: MessageEvent) => {
        expect(event.data).toEqual(
          JSON.stringify({
            type: 'RankingUpdate',
            player: {
              id: mockEvent.id,
              rank: mockEvent.rank,
            },
          })
        );
        done();
      });
    });
  });
});
