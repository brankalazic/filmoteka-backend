import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Rate } from "./rate.entity";

@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({type: "varchar", length: 64 })
  name: string;

  @Column({type: "text",  name: "description" })
  description: string;

  @Column({type: "varchar", nullable: true, length: 64 })
  genre: string | null;

  @Column({
    type: "decimal", 
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string;

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

  @OneToMany(() => Rate, (rate) => rate.movie)
  rates: Rate[];
}
