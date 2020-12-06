import { Controller, Get } from '@nestjs/common';

// ulaz - entry point
@Controller()
export class AppController {
  @Get() // http://localhost:3003/
  getHello(): string {
    return 'Dobar Dan!';
  }

  @Get('world') // http://localhost:3003/
  getWorld(): string {
    return 'Hello World!';
  }
}
