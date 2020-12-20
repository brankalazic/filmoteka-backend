import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Cart } from "src/entities/cart.entity";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { CartService } from "src/services/cart/cart.service";
import { Request } from 'express';
import { AddMovieToCartDto } from "src/dtos/cart/add.movie.to.cart.dto";
import { EditMovieInCartDto } from "src/dtos/cart/edit.movie.in.cart.dto";
import { Order } from "src/entities/order.entity";
import { OrderService } from "src/services/order/order.service";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/user/cart')
export class UserCartController {
    constructor(
        private cartService: CartService,
        private orderService: OrderService,
    ) {}

    private async getActiveCartByUserId(userId: number): Promise<Cart> {
        let cart = await this.cartService.getLastActiveCartByUserId(userId);
    
        if (!cart) {
            cart = await this.cartService.createNewCartForUser(userId);
        }

        return await this.cartService.getById(cart.cartId);
    }

    @Get() // http://localhost:3003/api/user/cart
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async getCurrentCart(@Req() req: Request):Promise<Cart> {
        return await this.getActiveCartByUserId(req.token.id);
    }

    @Post('addToCart') // http://localhost:3003/api/user/cart/addToCart
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async addToCart(@Body() data: AddMovieToCartDto, @Req() req: Request): Promise<Cart> {
        const cart = await this.getActiveCartByUserId(req.token.id);
        return await this.cartService.addMovieToCart(cart.cartId, data.movieId, data.quantity);
    }

    @Patch() //http://localhost:3003/api/user/cart/addToCart
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async changeQuantity(@Body() data: EditMovieInCartDto, @Req() req: Request): Promise<Cart> {
        const cart = await this.getActiveCartByUserId(req.token.id);
        return await this.cartService.changeQuantity(cart.cartId, data.movieId, data.quantity);
    }

    @Post('makeOrder') // //http://localhost:3003/api/user/cart/makeOrder
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async makeOrder(@Req() req: Request): Promise<Order | ApiResponse> {
        const cart = await this.getActiveCartByUserId(req.token.id);
        return await this.orderService.add(cart.cartId);
    }
}