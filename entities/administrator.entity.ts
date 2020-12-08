import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment.entity";

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity("administrator")
export class Administrator {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "administrator_id",
    unsigned: true,
  })
  administratorId: number;

  @Column({type: "varchar", unique: true, length: 32 })
  username: string;

  @Column({type: "varchar", name: "password_hash", length: 128 })
  passwordHash: string;

  @OneToMany(() => Comment, (comment) => comment.moderatorAdministrator)
  comments: Comment[];
}
