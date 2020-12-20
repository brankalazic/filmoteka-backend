import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartMovie } from "src/entities/cart-movie.entity";
import { Cart } from "src/entities/cart.entity";
import { Movie } from "src/entities/movie.entity";
import { Order } from "src/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cart:Repository<Cart>,

        @InjectRepository(CartMovie)
        private readonly cartMovie:Repository<CartMovie>,

        @InjectRepository(Movie)
        private readonly movie:Repository<Movie>,

        @InjectRepository(Order)
        private readonly order:Repository<Order>,
    ){}

    async getLastActiveCartByUserId(userId: number): Promise<Cart | null> {
        const carts = await this.cart.find({
            where: {
                userId: userId
            },
            order: {
                createdAt: "DESC",
            },
            take: 1,
            relations: [ "order" ],
        });

        if (!carts || carts.length === 0) {
            return null;
        }

        const cart = carts[0];

        if (cart.order !== null) {
            return null;
        }

        return cart;
    }

    async createNewCartForUser(userId: number): Promise<Cart> {
        const newCart: Cart = new Cart(); // instance of new cart object
        newCart.userId = userId;
        return await this.cart.save(newCart);
    }

    async addMovieToCart(cartId: number, movieId: number, quantity: number): Promise<Cart> {
        let record: CartMovie = await this.cartMovie.findOne({
            cartId: cartId,     
            movieId: movieId,
        });

        if (!record) {
            record = new CartMovie();
            record.cartId = cartId;
            record.movieId = movieId;
            record.quantity = quantity;
        } else {
            record.quantity += quantity;
        }

        await this.cartMovie.save(record);

        return this.getById(cartId);
    }

    async getById(cartId: number):Promise<Cart> {
        return await this.cart.findOne(cartId, {
            relations: [
                "user",
                "cartMovies",
                "cartMovies.movie",
                "cartMovies.movie.moviePrices",
            ],
        });
    }

    async changeQuantity(cartId: number, movieId: number, newQuantity: number): Promise<Cart> {
        let record: CartMovie = await this.cartMovie.findOne({
            cartId: cartId,     
            movieId: movieId,
        });

        if (record) {
            record.quantity = newQuantity;

            if (record.quantity === 0) {
                await this.cartMovie.delete(record.cartMovieId);
            } else {
                await this.cartMovie.save(record);
            }
        }

        return await this.getById(cartId); 
    }
}