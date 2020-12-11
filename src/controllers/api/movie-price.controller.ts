import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { MoviePrice } from "src/entities/movie-price.entity";
import { MoviePriceService } from "src/services/movie-price/movie-price.service";

@Controller('api/moviePrice')
@Crud({
    model: {
        type: MoviePrice
    },
    params: {
        id: {
            field: 'moviePriceId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           movie: {
               eager: true
           }, 
        }
    }
})
export class MoviePriceController {
    constructor(public service: MoviePriceService) {}
}