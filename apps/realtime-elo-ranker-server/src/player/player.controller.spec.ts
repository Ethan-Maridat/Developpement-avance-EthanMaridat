import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { HttpStatus } from '@nestjs/common';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const players = [new Player(), new Player()];
      jest.spyOn(service, 'findAll').mockResolvedValue(players);

      expect(await controller.findAll()).toBe(players);
    });
  });

  describe('findOne', () => {
    it('should return a player if found', async () => {
      const player = new Player();
      jest.spyOn(service, 'findOne').mockResolvedValue(player);

      expect(await controller.findOne('1')).toBe(player);
    });

    it('should return null if player not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      expect(await controller.findOne('1')).toBeNull();
    });
  });

  describe('create', () => {
    it('should return a BAD_REQUEST if no id is provided', async () => {
      const response = await controller.create('');
      expect(response).toEqual({
        code: HttpStatus.BAD_REQUEST,
        message: "L'identifiant du joueur est manquant.",
      });
    });

    it('should return a BAD_REQUEST if player already exists', async () => {
      const existingPlayer = new Player();
      jest.spyOn(service, 'findOne').mockResolvedValue(existingPlayer);

      const response = await controller.create('1');
      expect(response).toEqual({
        code: HttpStatus.BAD_REQUEST,
        message: 'Le joueur existe déjà.',
      });
    });

    it('should create and return the player', async () => {
      const newPlayer = new Player();
      newPlayer.id = '1';
      newPlayer.rank = 300;

      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(newPlayer);

      const response = await controller.create('1');
      expect(response).toEqual({
        id: newPlayer.id,
        rank: newPlayer.rank,
      });
    });
  });
});
