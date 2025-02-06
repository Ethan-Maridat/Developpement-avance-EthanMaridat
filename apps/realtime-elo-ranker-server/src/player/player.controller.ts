import { Controller, Get, Post, Param, Body } from '@nestjs/common';
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
  create(@Body('id') id: string) {
    console.log('id', id);
    return this.playerService.create(id);
  }
}
