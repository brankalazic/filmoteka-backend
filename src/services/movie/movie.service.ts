import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Comment } from "entities/comment.entity";
import { MoviePrice } from "entities/movie-price.entity";
import { Movie } from "entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(
        @InjectRepository(Movie) private readonly movie: Repository<Movie>,
        @InjectRepository(MoviePrice) private readonly moviePrice: Repository<MoviePrice>, // evidentiraj u modulu
        @InjectRepository(Comment) private readonly comments: Repository<Comment>, // evidentiraj u modulu
) {  super(movie); }

async createFullMovie(data: AddMovieDto): Promise<Movie | ApiResponse> {
    let newMovie: Movie = new Movie();
    newMovie.name = data.name;
    newMovie.description = data.description;
    newMovie.genre = data.genre;
    newMovie.year = data.year;
    newMovie.rating = data.rating;

    let savedMovie = await this.movie.save(newMovie);

    let  newMoviePrice: MoviePrice = new MoviePrice();
    newMoviePrice.movieId = savedMovie.movieId;
    newMoviePrice.price = data.price;

    await this.moviePrice.save(newMoviePrice);

    // for (let comment of data.comments) {
    //     let newComment: Comment = new Comment();
    //     newComment.userId = comment.userId;  
    //     newComment.originalValue = comment.originalValue;
    //     newComment.moderatedValue = comment.moderatedValue;
    //     newComment.ratingValue = comment.ratingValue;
    //     newComment.status = comment.status;
    //     newComment.moderatorAdministratorId = comment.moderatorAdministratorId;

    //     this.comments.save(newComment);
    // }

    return await this.movie.findOne(savedMovie.movieId, {
        relations: [
            "moviePrices",
        ]
    });
}
}