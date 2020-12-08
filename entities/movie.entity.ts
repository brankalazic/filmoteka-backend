import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Comment } from "./comment.entity";
import { MoviePrice } from "./movie-price.entity";

@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({
    type: "varchar", 
    name: "name", 
    length: 64 })
  name: string;

  @Column({
    type: "text",  
    name: "description" 
  })
  description: string;

  @Column({
    type: "varchar", 
    name: "genre", 
    nullable: true, 
    length: 64 
  })
  genre: string | null;

  @Column({type: "year", name: "year" })
  year: number;

  @Column({
    type: "decimal",
    name: "rating",
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  rating: string;

  @OneToMany(() => Cart, (cart) => cart.movie)
  carts: Cart[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => MoviePrice, (moviePrice) => moviePrice.movie)
  moviePrices: MoviePrice[];
}
