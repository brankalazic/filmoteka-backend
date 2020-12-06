import { AdministartorService } from './services/administartor/administartor.service';
import { Controller, Get } from '@nestjs/common';
import { Administrator } from 'entities/administrator.entity';


// ulaz - entry point
@Controller()
export class AppController {

  constructor(private administratorService:AdministartorService){}
  @Get() // http://localhost:3003/
  getHello(): string {
    return 'Dobar Dan!';
  }

  @Get('world') // http://localhost:3003/
  getWorld(): string {
    return 'Hello World!';
  }

  @Get('api/administrator') // http://localhost:3003/api/administrator
  getAllAdministrator():Promise<Administrator[]>{
    return this.administratorService.getAll();
  }

  @Get('/:id') // http://localhost:3003/:id
  getById():Promise<Administrator>{
    return this.administratorService.getById(2);
  }
  
}
