import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { Match } from '../match/match.entity';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string;

  @Column('int')
  rank: number;

  @OneToMany(() => Match, (match) => match.loser || match.winner)
  matches: Match[];
}
