export interface Song{
  _id: string,
  songName: string;
  singer: string;
  songImg: string;
  trackID: string;
  duration: string;
  genre: string;
  averageRating: string;
  releaseDate: Date;
  lyrics: string;
  linkToYoutube: string;
  linkToDeezer: string;
  linkToSpotify: string;
}
export interface Track{
  trackID: string,
  songID: string,
  url: string,
}
