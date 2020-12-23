import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Comment } from "src/entities/comment.entity";
import { MoviePrice } from "src/entities/movie-price.entity";
import { Movie } from "src/entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { In, Repository } from "typeorm";
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";
import { MovieSearchDto } from "src/dtos/movie/movie.search.dto";

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

<<<<<<< HEAD
    async search(data: MovieSearchDto): Promise<Movie[]> {
        const builder = await this.movie.createQueryBuilder("movie");
    
        builder.innerJoinAndSelect(
            "movie.moviePrices",
            "mp",
            "mp.createdAt = (SELECT MAX(mp.created_at) FROM movie_price AS mp WHERE mp.movieId = movie.movieId ORDER BY mp.createdAt DESC LIMIT 1 ) "
            );

        builder.where('movie.genreId = :genId', { genId: data.genreId })

        if (data.keywords && data.keywords.length > 0) {
            builder.andWhere(`movie.name LIKE :kw OR
                              movie.description LIKE :kw OR
                              movie.genre LIKE :kw`,
                              { kw: '%' + data.keywords.trim() + '%' });
        }

        if(data.priceMin && typeof data.priceMin === 'number') {
            builder.andWhere('mp.price >= :min', {min: data.priceMin});
        }

        if(data.priceMax && typeof data.priceMax === 'number') {
            builder.andWhere('mp.price <= :max', {max: data.priceMax});
        }
    
        let orderBy = 'name';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';
    
        if (data.orderBy) {
            orderBy = data.orderBy;

            if(orderBy === 'price') {
                orderBy = 'mp.price';
            }

            if(orderBy === 'name') {
                orderBy = 'movie.name';
=======
    async search(data: MovieSearchDto): Promise<Movie[] | ApiResponse> {
        const builder = await this.movie.createQueryBuilder('movie');

        builder.innerJoinAndSelect(
            "movie.moviePrices", 
            "mp", 
            "mp.createdAt = (SELECT MAX(mp.createdAt) FROM movie_price AS mp WHERE mp.movie_id = movie.movie_id)" //illegal practic
        
        );

        builder.where('movie.genre = :genre', { genre: data.genre });

        if (data.keywords && data.keywords.length > 0) {
            builder.andWhere(`(
                                movie.name LIKE :kw OR 
                                movie.description LIKE :kw
                                )`, 
                                {kw: '%' + data.keywords.trim() + '%'});
        }

        if (data.priceMin && typeof data.priceMin === 'number' ) {
            builder.andWhere('mp.price >= :min', { min: data.priceMin });
        }

        if (data.priceMax && typeof data.priceMax === 'number' ) {
            builder.andWhere('mp.price <= :max', { max: data.priceMax });
        }

        let orderBy = 'movie.name';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';

        if (data.orderBy) {
            orderBy = data.orderBy;

            if (orderBy === 'price') {
                orderBy = 'mp.price'; 
            }

            if (orderBy === 'name') {
                orderBy = 'movie.name'; 
>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06
            }
        }

        if (data.orderDirection) {
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection);
<<<<<<< HEAD
    
=======

>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06
        let page = 0;
        let perPage: 5 | 10 | 25 | 50 | 75 = 25;

        if (data.page && typeof data.page === 'number') {
            page = data.page;
        }

        if (data.itemsPerPage && typeof data.itemsPerPage === 'number') {
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);

<<<<<<< HEAD
        let movieIds = (await builder.getMany()).map(movie => movie.movieId);

        return await this.movie.find({
            where: { movieId: In(movieIds) },
            relations: [
                "moviePrices"
            ]
        });
=======
        let movies = await builder.getMany();

        if (movies.length === 0) {
            return new ApiResponse("ok", 0, "No movies found for these search parameters.");
        }
        
        return movies;
>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06
    }
}