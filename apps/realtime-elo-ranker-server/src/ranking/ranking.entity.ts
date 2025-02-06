import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Player } from '../player/player.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @OneToOne(() => Player)
  @JoinColumn()
  player: Player;
}
