class MovieModel {
    id: number;
    title: string;
    description: string;
    duration: number;
    releaseDate: string;
    director: string;
    posterUrl: string;
    constructor(id: number, title: string, description: string, duration: number, releaseDate: string, director: string, posterUrl: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.director = director;
        this.posterUrl = posterUrl;

    }
}
export default MovieModel;