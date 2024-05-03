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
  linkToBuy: string;
  linkToFree: string;
  showPopover: false;
  requirements: {
    sizeGame?: { value: number, unit: string };
    ramGame?: { value: number, unit: string };
    processorGame?: string;
    graphGame?: string;
  }

}

// export interface GameRequirements{
//   _id: string,
//   gameId: string,
//   platform: string;
//   sizeGame?: { value: number, unit: string };
//   ramGame?: { value: number, unit: string };
//   processorGame?: string;
//   graphGame?: string;
// }
