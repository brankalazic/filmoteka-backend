import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { AdministartorService } from "src/services/administartor/administartor.service";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministartorService
    ) {}

    @Get() // http://localhost:3003/api/administrator
    getAllAdministrator():Promise<Administrator[]>{
    return this.administratorService.getAll();
    }

    @Get(':id') // http://localhost:3003/api/administrator/4
    getById(@Param('id') administratorId: number):Promise<Administrator>{
        return this.administratorService.getById(administratorId);
    }

    @Put()
    add(@Body() data: AddAdministratorDto): Promise<Administrator> {
        return this.administratorService.add(data);
    }

    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator> {
        return this.administratorService.editById(id, data);
    }
}