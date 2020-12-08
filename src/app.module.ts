import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfiguration } from '../config/database';
import { Administrator } from '../entities/administrator.entity';
import { Cart } from '../entities/cart.entity';
import { Comment } from '../entities/comment.entity';
import { MoviePrice } from '../entities/movie-price.entity';
import { Movie } from '../entities/movie.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AppController } from './controllers/app.controller';
import { AdministartorService } from './services/administartor/administartor.service';


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
    ])
  ],
  controllers: [
    AppController,
    AdministratorController
  ],
  providers: [AdministartorService],
})
export class AppModule {}
