import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Index("fk_order_user_id", ["userId"], {})
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({
    type: "int", 
    name: "order_id", 
    unsigned: true 
  })
  orderId: number;

  @Column({type:"int", name: "user_id", unsigned: true })
  userId: number;

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
  status: "paid" | "not paid" | "waiting";

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
