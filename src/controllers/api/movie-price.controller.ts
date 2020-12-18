import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { MoviePrice } from "src/entities/movie-price.entity";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { MoviePriceService } from "src/services/movie-price/movie-price.service";

@Controller('api/moviePrice')
@Crud({
    model: {
        type: MoviePrice
    },
    params: {
        id: {
            field: 'moviePriceId',
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
                AllowToRoles('administrator'),
            ]
        },
        createManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles('administrator'),
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
export class MoviePriceController {
    constructor(public service: MoviePriceService) {}
}