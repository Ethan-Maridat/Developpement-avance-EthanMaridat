import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'loser' })
  loser: Player;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'winner' })
  winner: Player;

  @Column()
  draw: boolean;
}
