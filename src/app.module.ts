import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'entities/cart.entity';
import { Movie } from 'entities/movie.entity';
import { Rate } from 'entities/rate.entity';
import { User } from 'entities/user.entity';
import { DatabaseConfiguration } from '../config/database';
import { Administrator } from '../entities/administrator.entity';
import { AppController } from './app.controller';
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
        Cart,
        Movie,
        Rate,
        User
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Cart,
      Movie,
      Rate,
      User
    ])
  ],
  controllers: [AppController],
  providers: [AdministartorService],
})
export class AppModule {}
