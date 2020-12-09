import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";

@Index("fk_movie_price_movie_id", ["movieId"], {})
@Entity("movie_price")
export class MoviePrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "movie_price_id",
    unsigned: true,
  })
  moviePriceId: number;

  @Column({
    type: "int", 
    name: "movie_id", 
    unsigned: true })
  movieId: number;

  @Column({
    type: "decimal", 
    unsigned: true, 
    precision: 10, 
    scale: 2 
  })
  price: string;

  @Column({
    type: "timestamp", 
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.moviePrices, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
