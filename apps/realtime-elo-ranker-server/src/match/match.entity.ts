import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, { eager: true })
  player1: Player;

  @ManyToOne(() => Player, { eager: true })
  player2: Player;

  @Column()
  result: 'win' | 'lose' | 'draw';  // Résultat du match
}
