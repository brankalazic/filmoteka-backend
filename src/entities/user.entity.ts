import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Comment } from "./comment.entity";
import * as Validator from 'class-validator';

@Index("uq_user_username", ["username"], { unique: true })
@Index("uq_username_email", ["email"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ 
    type: "int", 
    name: "user_id", 
    unsigned: true 
  })
  userId: number;

  @Column({
    type: "varchar", 
    unique: true, 
    length: 64 
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(4, 64)
  username: string;

  @Column({
    type: "varchar", 
    unique: true, 
    length: 64 
  })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true,
  })
  email: string;

  @Column({
    type: "varchar", 
    length: 64 
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 64)
  forename: string;

  @Column({
    type: "varchar", 
    length: 64 
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 64)
  surname: string;

  @Column({
    type: "varchar", 
    name: "password_hash", 
    length: 128 
  })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
