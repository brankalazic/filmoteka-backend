import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministartorService } from "src/services/administartor/administartor.service";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from 'express';
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { UserService } from "src/services/user/user.service";
import { LoginUserDto } from "src/dtos/user/user.login.dto";

@Controller('auth')
export class AuthController {
    constructor(public administratorService: AdministartorService, public userService: UserService) {}

    @Post('administrator/login') // localhost:3303/auth/login
    async doAdministratorLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const administrator = await this.administratorService.getByUsernamme(data.username);
        
        if (!administrator) {
            return new Promise(resolve => {
                resolve(new ApiResponse('error', -3001));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (administrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        // token -> json {adminId, username, exp, ip, ua}
        const jwtData = new JwtDataDto();
        jwtData.role = "administrator";
        jwtData.id = administrator.administratorId;
        jwtData.username = administrator.username;


        let sada = new Date();
        sada.setDate(sada.getDate() + 14); // 14 days
        const istekTimestamp = sada.getTime() / 1000.0; // u sekundama
        jwtData.exp = istekTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            administrator.administratorId,
            administrator.username,
            token
        );
        return new Promise(resolve => resolve(responseObject));
    }

    @Post('user/register') // PUT localhost:3003/auth/user/register
    async userRegister(@Body() data: UserRegistrationDto) {
        return await this.userService.register(data);
    }

    @Post('user/login') // localhost:3303/auth/login
    async doUserLogin(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const user = await this.userService.getByUsernamme(data.username);
        
        if (!user) {
            return new Promise(resolve => {
                resolve(new ApiResponse('error', -3001));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (user.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        // token -> json {adminId, username, exp, ip, ua}
        const jwtData = new JwtDataDto();
        jwtData.role = "user";
        jwtData.id = user.userId;
        jwtData.username = user.username;


        let sada = new Date();
        sada.setDate(sada.getDate() + 14); // 14 days
        const istekTimestamp = sada.getTime() / 1000.0; // u sekundama
        jwtData.exp = istekTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            user.userId,
            user.username,
            token
        );
        return new Promise(resolve => resolve(responseObject));
    }
}