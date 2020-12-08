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
@Entity("movie_price", { schema: "filmoteka" })
export class MoviePrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "movie_price_id",
    unsigned: true,
  })
  moviePriceId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("decimal", { name: "price", unsigned: true, precision: 10, scale: 2 })
  price: string;

  @Column("timestamp", {
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
