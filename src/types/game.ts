export interface Odd {
  odd: number;
  sortOrder: number;
  name: string;
}

export interface Game {
  startDate: string;
  games: Odd[];
  name: string;
  nodeId: string;
}
