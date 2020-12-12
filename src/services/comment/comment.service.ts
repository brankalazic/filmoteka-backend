import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AddCommentDto } from "src/dtos/comment/add.comment.dto";
import { Comment } from "src/entities/comment.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";
// PROVERITI DA LI RADI
@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
    constructor(
        @InjectRepository(Comment) private readonly comments: Repository<Comment>, // evidentiraj u modulu
) {  super(comments); }

async createFullComment(data: AddCommentDto): Promise<Comment | ApiResponse> {
    let newComment: Comment = new Comment();
    newComment.userId = data.userId;  
    newComment.movieId = data.movieId;  
    newComment.originalValue = data.originalValue;
    newComment.moderatedValue = data.moderatedValue;
    newComment.ratingValue = data.ratingValue;
    newComment.status = data.status;
    newComment.moderatorAdministratorId = data.moderatorAdministratorId;

    let savedComment = await this.comments.save(newComment);

    return await this.comments.findOne(savedComment.commentId, {
        relations: [
            "user",
            "movie",
        ]
    });
}
}