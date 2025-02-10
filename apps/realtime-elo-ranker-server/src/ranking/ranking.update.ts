// ranking.types.ts
export class RankingUpdate {
  id: string;
  rank: number;

  constructor(id: string, rank: number) {
      this.id = id;
      this.rank = rank;
  }
}