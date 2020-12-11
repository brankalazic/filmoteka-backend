import { AdministartorService } from '../services/administartor/administartor.service';
import { Controller, Get } from '@nestjs/common';
import { Administrator } from '../entities/administrator.entity';

// ulaz - entry point
@Controller()
export class AppController {

  constructor(private administratorService:AdministartorService){}
  @Get() // http://localhost:3003/
  getHello(): string {
    return 'Home Page!';
  }
  
}
