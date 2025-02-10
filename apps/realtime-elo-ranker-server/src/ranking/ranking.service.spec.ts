import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';

describe('RankingService', () => {
  let service: RankingService;
  let repository: Repository<Player>;

  // Création d'un mock de Repository
  const mockPlayerRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a ranking ordered by rank in descending order', async () => {
    const mockPlayers = [
      { id: '1', rank: 500 },
      { id: '2', rank: 300 },
      { id: '3', rank: 400 },
    ];

    mockPlayerRepository.find.mockResolvedValue(mockPlayers);

    const result = await service.getRanking();

    expect(result).toEqual(mockPlayers);
    expect(mockPlayerRepository.find).toHaveBeenCalledWith({
      order: { rank: 'DESC' },
    });
  });

  it('should return an empty array if no players exist', async () => {
    mockPlayerRepository.find.mockResolvedValue([]);

    const result = await service.getRanking();

    expect(result).toEqual([]);
    expect(mockPlayerRepository.find).toHaveBeenCalledWith({
      order: { rank: 'DESC' },
    });
  });
});
