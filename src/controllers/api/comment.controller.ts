import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AddCommentDto } from "src/dtos/comment/add.comment.dto";
import { Comment } from "src/entities/comment.entity";
import { CommentService } from "src/services/comment/comment.service";

@Controller('api/comment')
@Crud({
    model: {
        type: Comment
    },
    params: {
        id: {
            field: 'commentId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           movie: {
               eager: true
           },
        }
    }
})
export class CommentController {
    constructor(public service: CommentService) {}

    @Post('createFull') // api/comment/createFull
    createFullMovie(@Body() data: AddCommentDto) {
        return this.service.createFullComment(data);
    }
}