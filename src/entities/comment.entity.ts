import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrator } from "./administrator.entity";
import { Movie } from "./movie.entity";
import { User } from "./user.entity";
import * as Validator from 'class-validator';

@Index("uq_comment_user_id_movie_id", ["userId", "movieId"], { unique: true })
@Index(
  "fk_comment_moderator_administrator_id",
  ["moderatorAdministratorId"],
  {}
)
@Index("fk_comment_user_id", ["userId"], {})
@Index("fk_comment_movie_id", ["movieId"], {})
@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn({ 
    type: "int",
    name: "comment_id", 
    unsigned: true })
  commentId: number;

  @Column({type:"int",  name: "user_id", unsigned: true })
  userId: number;

  @Column({type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({type: "mediumtext", name: "original_value" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(64, 10000)
  originalValue: string;

  @Column({type: "mediumtext", name: "moderated_value", nullable: true })
  @Validator.IsString()
  @Validator.Length(64, 10000)
  moderatedValue: string | null;

  @Column({type: "tinyint", name: "rating_value", width: 1 })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  ratingValue: number;

  @Column({
    type: "enum", 
    enum: ["pending", "approved", "denied"],
    default: () => "'pending'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["pending", "approved", "denied"])
  status: "pending" | "approved" | "denied";

  @Column({
    type: "int", 
    name: "moderator_administrator_id",
    nullable: true,
    unsigned: true,
  })
  moderatorAdministratorId: number | null;

  @Column({
    type: "timestamp", 
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Administrator, (administrator) => administrator.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    {
      name: "moderator_administrator_id",
      referencedColumnName: "administratorId",
    },
  ])
  moderatorAdministrator: Administrator;

  @ManyToOne(() => Movie, (movie) => movie.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
