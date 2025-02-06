import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/player.entity';
import { Match } from './match/match.entity';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';
import { Ranking } from './ranking/ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, Match, Ranking]),
  ],
  controllers: [PlayerController, MatchController, RankingController],
  providers: [PlayerService, MatchService, RankingService],
})
export class AppModule {}
