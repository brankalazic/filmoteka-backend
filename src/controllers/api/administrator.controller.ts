import { Body, Controller, Get, Param, Patch, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { Administrator } from "../../entities/administrator.entity";
import { AddAdministratorDto } from "../../dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "../../dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "../../misc/api.response.class";
import { AdministartorService } from "../../services/administartor/administartor.service";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministartorService
    ) {}

    @Get() // http://localhost:3003/api/administrator
    //@SetMetadata('allow_to_roles', ['administrator'])
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    getAllAdministrator():Promise<Administrator[]>{
    return this.administratorService.getAll();
    }

    @Get(':id') // http://localhost:3003/api/administrator/4
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    getById(@Param('id') administratorId: number):Promise<Administrator | ApiResponse>{
        return new Promise(async (resolve) => {
            let admin = await this.administratorService.getById(administratorId);
        
            if (admin === undefined) {
                resolve(new ApiResponse("error", -1002));
            }
            resolve(admin);
        })
        
    }

    @Put()
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorService.add(data);
    }

    @Patch(':id')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administratorService.editById(id, data);
    }
}