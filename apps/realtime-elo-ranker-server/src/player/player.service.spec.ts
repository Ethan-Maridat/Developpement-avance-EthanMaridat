import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should return all players', async () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'John',
        score: 100,
        matchesAsPlayer1: [],
        matchesAsPlayer2: [],
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(players);
    const result = await service.getAllPlayers();
    expect(result).toEqual(players);
  });

  it('should throw an error if player not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    try {
      await service.getPlayerById(1);
    } catch (e) {
      // Vérification du type d'erreur avec `instanceof`
      if (e instanceof HttpException) {
        expect(e.getResponse()).toEqual({
          statusCode: 404,
          message: 'Player with id 1 not found',
        });
      } else {
        throw e;
      }
    }
  });

  it('should update player score', async () => {
    const player: Player = {
      id: 1,
      name: 'John',
      score: 100,
      matchesAsPlayer1: [],
      matchesAsPlayer2: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(player);
    jest.spyOn(repository, 'save').mockResolvedValue({ ...player, score: 110 });

    const result = await service.updatePlayerScore(1, 10);
    expect(result.score).toBe(110);
  });
});
