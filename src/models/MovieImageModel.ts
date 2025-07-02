import MovieModel from "./MovieModel";

class MovieImageModel{
id: number;
imageUrl: string;
isThumbnail: boolean;
description: string;
movie:MovieModel[];
constructor(id: number, imageUrl: string, isThumbnail: boolean, description: string, movie: MovieModel[]) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.isThumbnail = isThumbnail;
    this.description = description;
    this.movie = movie;
  }
}
export default MovieImageModel;