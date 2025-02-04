import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api/players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.playerService.create(name);
  }
}
