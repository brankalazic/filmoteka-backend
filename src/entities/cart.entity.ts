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

@Index("fk_cart_user_id", ["userId"], {})
@Index("fk_cart_movie_id", ["movieId"], {})
@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column({
    type: "int", 
    name: "user_id", 
    unsigned: true 
  })
  userId: number;

  @Column({
    type: "int", 
    name: "movie_id", 
    unsigned: true 
  })
  movieId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.carts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
