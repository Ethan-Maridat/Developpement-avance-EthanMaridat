import { Controller, Get, Post, Param, Body, HttpStatus, HttpException, Res } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll() {
    const players = this.playerService.findAll();
    console.log('Players:', players); // Ajoute ce log pour voir ce qui est retourné
    return players;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Post()
  async create(@Body('id') id: string) {
    if (!id || id.trim() === '') {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'L\'identifiant du joueur est manquant.',
      };
    }

    const existingPlayer = await this.playerService.findOne(id);
    if (existingPlayer) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'Le joueur existe déjà.',
      };
    }

    const newPlayer = await this.playerService.create(id);
    return {
      id: newPlayer.id,
      rank: newPlayer.rank,
    };
  }
}


