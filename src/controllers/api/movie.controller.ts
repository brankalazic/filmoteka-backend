import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { MovieService } from "src/services/movie/movie.service";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            moviePrices: {
                eager: false
            },
            comments: {
                eager: false
            },
        }
    }
})
export class MovieController {
    constructor(public service: MovieService) {}

    @Post('createFull') // api/movie/createFull
    createFullMovie(@Body() data: AddMovieDto) {
        return this.service.createFullMovie(data);
    }
}