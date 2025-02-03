import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/player.entity';
import { Match } from './match/match.entity';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { ClassementController } from './classement/classement.controller';
import { ClassementService } from './classement/classement.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Player, Match],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, Match]),
  ],
  controllers: [PlayerController, MatchController, ClassementController],
  providers: [PlayerService, MatchService, ClassementService],
})
export class AppModule {}
