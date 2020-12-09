import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Comment } from "./comment.entity";
import { MoviePrice } from "./movie-price.entity";

@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({
    type: "varchar",
    length: 64 })
  name: string;

  @Column({
    type: "text",  
  })
  description: string;

  @Column({
    type: "varchar", 
    nullable: true, 
    length: 64 
  })
  genre: string | null;

  @Column({type: "year"})
  year: number;

  @Column({
    type: "decimal",
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  rating: string;

  // ova je dodata zasebno
  // @ManyToMany(type => Comment, comment => comment.movies)
  // @JoinTable({
  //   name: "movie",
  //   joinColumn: { name: "user_id", referencedColumnName: "userId"},
  //   inverseJoinColumn: { name: "movie_id", referencedColumnName: "movieId"}
  // })
  // comments1: Comment[];

  @OneToMany(() => Cart, (cart) => cart.movie)
  carts: Cart[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => MoviePrice, (moviePrice) => moviePrice.movie)
  moviePrices: MoviePrice[];
}
