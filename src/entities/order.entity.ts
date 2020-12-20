import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import * as Validator from 'class-validator';

@Index("uq_order_cart_id", ["cartId"], { unique: true })
@Index("fk_order_user_id", ["cartId"], {})
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ 
    type: "int", 
    name: "order_id", 
    unsigned: true 
  })
  orderId: number;

  @Column({
    type: "int", 
    name: "cart_id", 
    unique: true, 
    unsigned: true })
  cartId: number;

  @Column({
    type: "timestamp", 
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "enum", 
    enum: ["paid", "not paid", "waiting"],
    default: () => "'waiting'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["paid", "not paid", "waiting"])
  status: "paid" | "not paid" | "waiting";

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}
