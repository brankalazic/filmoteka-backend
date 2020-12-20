import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Movie } from "./movie.entity";
import * as Validator from 'class-validator';

@Index("uq_cart_movie_cart_id_movie_id", ["cartId", "movieId"], {
  unique: true,
})
@Index("fk_cart_movie_movie_id", ["movieId"], {})
@Entity("cart_movie")
export class CartMovie {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "cart_movie_id",
    unsigned: true,
  })
  cartMovieId: number;

  @Column({type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column({type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({type: "int", unsigned: true })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;

  @ManyToOne(() => Movie, (movie) => movie.cartMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
