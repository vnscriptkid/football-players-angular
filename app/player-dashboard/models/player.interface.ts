export interface Level {
  type: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  isAvailable: boolean;
  level: string;
}
