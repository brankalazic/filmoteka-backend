import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Comment } from "entities/comment.entity";
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
}