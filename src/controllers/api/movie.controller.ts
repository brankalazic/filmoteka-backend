import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "src/entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { MovieService } from "src/services/movie/movie.service";
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";

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
    },
    // sklanjamo edit mogucnosti preko crud-a
    routes: {
        exclude: [ 'updateOneBase', 'replaceOneBase', 'deleteOneBase' ],
    }
})
export class MovieController {
    constructor(public service: MovieService) {}

    @Post('createFull') // api/movie/createFull
    createFullMovie(@Body() data: AddMovieDto) {
        return this.service.createFullMovie(data);
    }

    @Patch(':id') // 'api/movie/2
    editFullMovie(@Param('id') id: number, @Body() data: EditMovieDto) {
        return this.service.editFullMovie(id, data);
    }
}