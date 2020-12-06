import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database';
import { Administrator } from 'entities/administrator.entity';
import { AppController } from './app.controller';
import { AdministartorService } from './services/administartor/administartor.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:DatabaseConfiguration.hostname,
      port:3307, // 3306 UROS I BRANKA
      username:DatabaseConfiguration.username,
      password:DatabaseConfiguration.password,
      database:DatabaseConfiguration.database,
      entities:[
        Administrator
      ]
    }),
    TypeOrmModule.forFeature([Administrator])
  ],
  controllers: [AppController],
  providers: [AdministartorService],
})
export class AppModule {}
