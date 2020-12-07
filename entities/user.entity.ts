import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Rate } from "./rate.entity";

@Index("uq_user_username", ["username"], { unique: true })
@Index("uq_user_email", ["email"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({type: "varchar",  name: "email", unique: true, length: 64 })
  email: string;

  @Column({type: "varchar", length: 64 })
  forename: string;

  @Column({type: "varchar",  length: 64 })
  surname: string;

  @Column({type: "varchar",  unique: true, length: 64 })
  username: string;

  @Column({type: "varchar",  name: "password_hash", length: 128 })
  passwordHash: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];
}
