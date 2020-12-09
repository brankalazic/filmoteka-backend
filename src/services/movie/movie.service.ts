import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Movie } from "entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(
        @InjectRepository(Movie) private readonly movie: Repository<Movie> // evidentiraj u modulu
) {  super(movie); }
}