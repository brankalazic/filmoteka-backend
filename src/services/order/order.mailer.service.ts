import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailConfig } from "config/mail.config";
import { CartMovie } from "src/entities/cart-movie.entity";
import { Order } from "src/entities/order.entity";

@Injectable()
export class OrderMailer {
    constructor (private readonly mailerService: MailerService) {}

    async sendOrderEmail(order: Order) {
        await this.mailerService.sendMail({
            to: order.cart.user.email, // send to 
            bcc: MailConfig.orderNotificationMail,
            subject: 'Order details',
            encoding: 'UTF-8',
            html: this.makeOrderHtml(order),
        });
    }

    private makeOrderHtml(order: Order): string {
        let suma = order.cart.cartMovies.reduce((sum, current: CartMovie) => {
            return sum + current.quantity * current.movie.moviePrices[current.movie.moviePrices.length-1].price;
        }, 0)
        return `<p>Zahvaljujemo se na Vasoj porudzbini!</p>
                <p>Ovo su detalji Vase porudzbine:</p>
                <ul>
                    ${order.cart.cartMovies.map((cartMovie: CartMovie) => {
                        return `<li>
                            ${ cartMovie.movie.name }
                            ${ cartMovie.quantity }
                        </li>`;
                    }).join("")}
                </ul>
                <p>Ukupan iznos je: ${ suma.toFixed(2) } EUR.</p>
                <p>Potpis....</p>`
                
    }
}