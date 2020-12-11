import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MoviePrice } from "src/entities/movie-price.entity";
import { Repository } from "typeorm";

@Injectable()
export class MoviePriceService extends TypeOrmCrudService<MoviePrice> {
    constructor(
        @InjectRepository(MoviePrice) private readonly moviePrice: Repository<MoviePrice> // evidentiraj u modulu
) {  super(moviePrice); }
}