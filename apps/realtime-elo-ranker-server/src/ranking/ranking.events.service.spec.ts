import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsService } from '../ranking/ranking.events.service';
import { RankingUpdate } from '../ranking/ranking.update';
import { Subject } from 'rxjs';

describe('RankingEventsService', () => {
  let service: RankingEventsService;
  let rankingSubject: Subject<RankingUpdate>;

  beforeEach(async () => {
    rankingSubject = new Subject<RankingUpdate>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingEventsService],
    }).compile();

    service = module.get<RankingEventsService>(RankingEventsService);
    jest.spyOn(service, 'getRankingEvents').mockReturnValue(rankingSubject.asObservable());
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  it('devrait émettre un événement de mise à jour du classement', (done) => {
    const rankingUpdate = new RankingUpdate('1', 1500);
    
    service.getRankingEvents().subscribe((update) => {
      expect(update).toEqual(rankingUpdate);
      done();
    });
    
    rankingSubject.next(rankingUpdate);
  });
});
