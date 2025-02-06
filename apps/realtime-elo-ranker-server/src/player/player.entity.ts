import { Entity, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { Match } from '../match/match.entity';
import { Ranking } from '../ranking/ranking.entity';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Ranking, (ranking) => ranking.player, {
    cascade: true,
    eager: true,
  })
  rank: Ranking;

  @OneToMany(() => Match, (match) => match.loser || match.winner)
  matches: Match[];
}
