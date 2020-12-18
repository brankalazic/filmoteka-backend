import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartMovie } from "./cart-movie.entity";
import { Comment } from "./comment.entity";
import { MoviePrice } from "./movie-price.entity";

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
  name: string;

  @Column({
    type: "text"
  })
  description: string;

  @Column({
    type: "varchar", 
    nullable: true, 
    length: 64 })
  genre: string | null;

  @Column({
    type: "year",
  })
  year: string;

  @Column({
    type: "decimal", 
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  rating: number;

  @OneToMany(() => CartMovie, (cartMovie) => cartMovie.movie)
  cartMovies: CartMovie[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => MoviePrice, (moviePrice) => moviePrice.movie)
  moviePrices: MoviePrice[];
}
