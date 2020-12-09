import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Comment } from "entities/comment.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
    constructor(
        @InjectRepository(Comment) private readonly comment: Repository<Comment> // evidentiraj u modulu
) {  super(comment); }
}