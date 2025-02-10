import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { RankingUpdate } from '../ranking/ranking.update';

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: Repository<Player>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const players = [new Player(), new Player()];
      jest.spyOn(repository, 'find').mockResolvedValue(players);

      expect(await service.findAll()).toBe(players);
    });
  });

  describe('findOne', () => {
    it('should return a player if found', async () => {
      const player = new Player();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(player);

      expect(await service.findOne('1')).toBe(player);
    });

    it('should return null if player not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      expect(await service.findOne('1')).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and save a player and emit an event', async () => {
      const player = new Player();
      player.id = '1';
      player.rank = 300;

      jest.spyOn(repository, 'create').mockReturnValue(player);
      jest.spyOn(repository, 'save').mockResolvedValue(player);
      jest.spyOn(eventEmitter, 'emit');

      const createdPlayer = await service.create('1');
      
      expect(createdPlayer).toEqual(player);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'updated-ranking',
        new RankingUpdate(player.id, player.rank),
      );
    });

    it('should handle error if creating a player fails', async () => {
      const errorMessage = 'Failed to create player';
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      try {
        await service.create('1');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('update', () => {
    it('should update and save a player', async () => {
      const player = new Player();
      player.id = '1';
      player.rank = 350;
      jest.spyOn(repository, 'save').mockResolvedValue(player);

      const updatedPlayer = await service.update(player);
      
      expect(updatedPlayer).toEqual(player);
    });

    it('should handle error if updating a player fails', async () => {
      const player = new Player();
      player.id = '1';
      player.rank = 350;
      const errorMessage = 'Failed to update player';

      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      try {
        await service.update(player);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
