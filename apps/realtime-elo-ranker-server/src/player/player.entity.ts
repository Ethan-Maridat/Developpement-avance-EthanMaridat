import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 1500 })
  eloRating: number;  // Le classement Elo initial est 1500

  @Column({ type: 'json', default: [] })
  matchHistory: any[];  // Historique des matchs du joueur

  // Calcul du classement Elo initial basé sur la moyenne des joueurs existants
  static async calculateInitialElo(playerRepository) {
    const players = await playerRepository.find();
    if (players.length === 0) return 1500;  // Valeur par défaut si aucun joueur
    const totalElo = players.reduce((acc, player) => acc + player.eloRating, 0);
    return totalElo / players.length;
  }
}
