import { Body, Controller, HttpCode, Post, Put, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { SuccessStatusCode } from "src/helper/status-codes";
import { AuthService } from "./auth.service";
import * as DTO from '../auth/dtos/index'
import { Response } from "express";
import { StatusCode } from "src/helper/status-code.interceptor";
import { User } from "@prisma/client";
import { AuthGuard } from "./auth.guard";
@Controller()
export class AuthController{

    constructor(private authService: AuthService, private helperService: HelperService){

    }

    @Post('login')
    @HttpCode(200)
    @StatusCode(SuccessStatusCode.SUCCESSFUL_LOGIN)
    async login( @Res({passthrough: true}) response: Response, @Body() body: DTO.Request.LoginRequestDTO){
        
        const { user, token } = await this.authService.login(body.email, body.password)

        response.cookie('token', token);

        return user;
    }

    @Post('register')
    @StatusCode(SuccessStatusCode.SUCCESSFUL_REGISTRATION)
    @UseGuards(AuthGuard)
    async register( @Res({passthrough: true}) response: Response, @Body() body: DTO.Request.RegisterRequestDTO){

        const authUser: User = response.locals.user;
        const { user, token } = await this.authService.register(body, authUser)

        response.cookie('token', token)
        return user;
    }
}