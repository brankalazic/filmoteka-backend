import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AddCommentDto } from "src/dtos/comment/add.comment.dto";
import { Comment } from "src/entities/comment.entity";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
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
    },
    routes: {
        only: [
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase",
            "updateOneBase",
        ],
        createOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
        createManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator'), // mozda oba ?
            ]
        }, 
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },  
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator', 'user'),
            ]
        },   
    }
})
export class CommentController {
    constructor(public service: CommentService) {}
    // mozda nece raditi
    @Post('createFull') // api/comment/createFull
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator', 'user')
    createFullComment(@Body() data: AddCommentDto) {
        return this.service.createFullComment(data);
    }
}