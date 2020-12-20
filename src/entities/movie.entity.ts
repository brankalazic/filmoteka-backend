import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartMovie } from "./cart-movie.entity";
import { Comment } from "./comment.entity";
import { MoviePrice } from "./movie-price.entity";
import * as Validator from 'class-validator';

@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn({ 
    type: "int", 
    name: "movie_id", 
    unsigned: true 
  })
  movieId: number;

  @Column({
    type: "varchar",
    length: 64 
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5, 64)
  name: string;

  @Column({ type: "text" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(32, 10000)
  description: string;

  @Column({
    type: "varchar", 
    nullable: true, 
    length: 64 
  })
  @Validator.IsString()
  @Validator.Length(3, 64)
  genre: string | null;

  @Column({
    type: "year",
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 5)
  year: string;

  @Column({
    type: "decimal", 
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  rating: number;

  @OneToMany(() => CartMovie, (cartMovie) => cartMovie.movie)
  cartMovies: CartMovie[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => MoviePrice, (moviePrice) => moviePrice.movie)
  moviePrices: MoviePrice[];
}
