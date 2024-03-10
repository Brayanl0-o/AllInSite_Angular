export interface Game {
  _id: string;
  gameName: string;
  gameImg: string;
  platform: string;
  releaseDate: Date;
  developer: string;
  genre: string;
  averageRating: number;
  descriptionGame: string;
  gameTrailer: string;
  showPopover: false;
}

export interface GameRequirements{
  _id: string,
  gameId: string,
  platform: string;
  sizeGame?: number;
  ramGame?: number;
  processorGame?: string;
  graphGame?: string;
}
