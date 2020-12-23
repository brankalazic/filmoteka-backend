import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviePrice } from 'src/entities/movie-price.entity';
import { DatabaseConfiguration } from '../config/database';
import { Administrator } from './entities/administrator.entity';
import { Cart } from './entities/cart.entity';
import { Comment } from './entities/comment.entity';
import { Movie } from './entities/movie.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AuthController } from './controllers/api/auth.controller';
import { CommentController } from './controllers/api/comment.controller';
import { MoviePriceController } from './controllers/api/movie-price.controller';
import { MovieController } from './controllers/api/movie.controller';
import { UserCartController } from './controllers/api/user.cart.controller';
import { AppController } from './controllers/app.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AdministartorService } from './services/administartor/administartor.service';
import { CommentService } from './services/comment/comment.service';
import { MoviePriceService } from './services/movie-price/movie-price.service';
import { MovieService } from './services/movie/movie.service';
import { UserService } from './services/user/user.service';
import { CartMovie } from './entities/cart-movie.entity';
import { CartService } from './services/cart/cart.service';
import { OrderService } from './services/order/order.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from 'config/mail.config';
import { OrderMailer } from './services/order/order.mailer.service';
import { AdministratorOrderController } from './controllers/api/admininistrator.order.controller';
import { UserToken } from './entities/user-token.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3307, // 3306 UROS I BRANKA
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities:[
        Administrator,
        User,
        Cart,
        Comment,
        Movie,
        MoviePrice,
        Order,
        CartMovie,
        UserToken
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      User,
      Cart,
      Comment,
      Movie,
      MoviePrice,
      Order,
      CartMovie,
      UserToken
    ]),
    MailerModule.forRoot({
      transport: 'smtps://' + MailConfig.username + ':' + MailConfig.password + '@' + MailConfig.hostname,
      
      defaults: {
        from: MailConfig.senderEmail,
      },
    }),
  ],
  controllers: [
    AppController,
    AdministratorController,
    MovieController,
    MoviePriceController,
    CommentController,
    AuthController,
    UserCartController,
    AdministratorOrderController
  ],
  providers: [
    AdministartorService,
    UserService,
    MovieService,
    MoviePriceService,
    CommentService,
    CartService,
    OrderService,
    OrderMailer
  ],
  exports: [
    AdministartorService,
    UserService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*') // skip sve sto pocinje sa auth
    .forRoutes('api/'); // a jesu api
  }
  
}
