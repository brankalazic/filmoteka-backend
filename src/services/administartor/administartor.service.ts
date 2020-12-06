import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministartorService {
constructor(
    @InjectRepository(Administrator)
    private readonly administartor:Repository<Administrator>
){}

getAll():Promise<Administrator[]>{
    return this.administartor.find();
}

getById(id:number):Promise<Administrator>{
    return this.administartor.findOne(id);
}
   
}
