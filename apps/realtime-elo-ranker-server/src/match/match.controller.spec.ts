import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerService } from '../player/player.service';
import { HttpStatus } from '@nestjs/common';

describe('MatchController', () => {
  let controller: MatchController;
  let matchService: MatchService;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            createMatch: jest.fn(),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    matchService = module.get<MatchService>(MatchService);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('devrait retourner une erreur si loser est manquant', async () => {
      const response = await controller.create({ loser: '', winner: '1', draw: false });
      expect(response).toEqual({ code: HttpStatus.BAD_REQUEST, message: "L'identifiant du joueur perdant est manquant." });
    });

    it('devrait retourner une erreur si winner est manquant', async () => {
      const response = await controller.create({ loser: '2', winner: '', draw: false });
      expect(response).toEqual({ code: HttpStatus.BAD_REQUEST, message: "L'identifiant du joueur gagnant est manquant." });
    });

    it('devrait retourner une erreur si loser et winner sont identiques', async () => {
      const response = await controller.create({ loser: '1', winner: '1', draw: false });
      expect(response).toEqual({ code: HttpStatus.BAD_REQUEST, message: "Le joueur gagnant et le joueur perdant ne peuvent pas être les mêmes." });
    });

    it("devrait retourner une erreur si un joueur n'existe pas", async () => {
      jest.spyOn(playerService, 'findOne').mockResolvedValueOnce(null);
      const response = await controller.create({ loser: '2', winner: '1', draw: false });
      expect(response).toEqual({ code: HttpStatus.BAD_REQUEST, message: "Le joueur gagnant ou perdant n'existe pas." });
    });

    it('devrait créer un match si toutes les conditions sont remplies', async () => {
      jest.spyOn(playerService, 'findOne').mockResolvedValueOnce({ id: '2', rank: 1400, matches: [] });
      jest.spyOn(playerService, 'findOne').mockResolvedValueOnce({ id: '1', rank: 1500, matches: [] });
      jest.spyOn(matchService, 'createMatch').mockResolvedValue({} as any);
      
      const response = await controller.create({ loser: '2', winner: '1', draw: false });
      expect(matchService.createMatch).toHaveBeenCalledWith('2', '1', false);
    });
  });
});
