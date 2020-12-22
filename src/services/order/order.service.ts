import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Order } from "src/entities/order.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Cart)
        private readonly cart:Repository<Cart>,


        @InjectRepository(Order)
        private readonly order:Repository<Order>,
    ){}

    async add(cartId: number): Promise<Order | ApiResponse> {
        const order = await this.order.findOne({
            cartId: cartId,
        });
        if (order) {
            return new ApiResponse("error", -7001, "An order for this cart has been already made.");
        }

        const cart = await this.cart.findOne(cartId, {
            relations: [
                "cartMovies",
            ]
        });

        if (!cart) {
            return new ApiResponse("error", -7002, "No such cart found.");
        }

        if (cart.cartMovies.length === 0) {
            return new ApiResponse("error", -7003, "This cart is empty.");
        }

        const newOrder: Order = new Order();
        newOrder.cartId = cartId;
        const savedOrder = await this.order.save(newOrder);

        return await this.order.findOne(savedOrder.orderId);
    }

    async getById(orderId: number) {
        return await this.order.findOne(orderId, {
            relations: [
                "cart",
                "cart.user",
                "cart.cartMovies",
                "cart.cartMovies.movie",
                "cart.cartMovies.movie.moviePrices",
            ],
        });
    }

    async changeStatus(orderId: number, newStatus: "paid" | "not paid" | "waiting") {
        const order = await this.getById(orderId);

        if (!orderId) {
            return new ApiResponse("error", -9001, "No such order found.");
        }

        order.status = newStatus;

        await this.order.save(order);

        return await this.getById(orderId);
    }
}