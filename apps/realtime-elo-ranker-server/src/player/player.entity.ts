import { Entity, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { Match } from '../match/match.entity';
import { Classement } from '../classement/classement.entity';

@Entity()
export class Player {
  @PrimaryColumn()
  name: string;

  @OneToOne(() => Classement, (classement) => classement.player, {
    cascade: true,
  })
  classement: Classement;

  @OneToMany(() => Match, (match) => match.loser || match.winner)
  matches: Match[];
}
