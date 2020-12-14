import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Comment } from "src/entities/comment.entity";
import { MoviePrice } from "src/entities/movie-price.entity";
import { Movie } from "src/entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";

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

        return await this.movie.findOne(savedMovie.movieId, {
            relations: [
                "moviePrices",
            ]
        });
    }

    async editFullMovie(movieId: number, data: EditMovieDto): Promise<Movie | ApiResponse> {
        const existingMovie: Movie = await this.movie.findOne(movieId, {
            relations: ['moviePrices']
        });

        if (!existingMovie) {
            return new ApiResponse('error', -5001, 'Movie not found!');
        }

        existingMovie.name = data.name;
        existingMovie.description = data.description;
        existingMovie.genre = data.genre;
        existingMovie.year = data.year;
        existingMovie.rating = data.rating;

        const savedMovie = await this.movie.save(existingMovie);
        if (!savedMovie) {
            return new ApiResponse('error', -5002, 'Could not save new movie data.');
        }

        const newPriceString: string = Number(data.price).toFixed(2);

        const lastPrice = existingMovie.moviePrices[existingMovie.moviePrices.length -1].price;
        const lastPriceString: string = Number(lastPrice).toFixed(2);

        if (newPriceString !== lastPriceString) {
            const newMoviePrice = new MoviePrice();
            newMoviePrice.movieId = movieId;
            newMoviePrice.price = data.price;

            const savedMoviPrice = this.moviePrice.save(newMoviePrice);
            if (!savedMoviPrice) {
                return new ApiResponse('error', -5003, 'Could not save new movie price.');
            }
        }

        return await this.movie.findOne(movieId, {
            relations: [
                "moviePrices",
            ]
        });
    }
}