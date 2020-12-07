import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";
import { User } from "./user.entity";

@Index("fk_rate_user_id", ["userId"], {})
@Index("fk_rate_movie_id", ["movieId"], {})
@Entity("rate", { schema: "filmoteka" })
export class Rate {
  @PrimaryGeneratedColumn({ type: "int", name: "rate_id", unsigned: true })
  rateId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("text", { name: "value" })
  value: string;

  @ManyToOne(() => Movie, (movie) => movie.rates, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.rates, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
