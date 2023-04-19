import { Body, Controller, Post, Put, Res, UseInterceptors } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { SuccessStatusCode } from "src/helper/status-codes";
import { AuthService } from "./auth.service";
import * as DTO from '../auth/dtos/index'
import { StatusCodeInterceptor } from "src/helper/status-code.interceptor";
import { Response } from "express";
@Controller()
export class AuthController{

    constructor(private authService: AuthService, private helperService: HelperService){

    }

    @Post('login')
    @UseInterceptors(new StatusCodeInterceptor(SuccessStatusCode.SUCCESSFUL_LOGIN))
    async login( @Res({passthrough: true}) response: Response, @Body() body: DTO.Request.LoginRequestDTO){
        
        const { user, token } = await this.authService.login(body.email, body.password)

        response.cookie('token', token);

        return user;
    }

    @Post('register')
    @UseInterceptors(new StatusCodeInterceptor(SuccessStatusCode.SUCCESSFUL_REGISTRATION))
    async register( @Res({passthrough: true}) response: Response, @Body() body: DTO.Request.RegisterRequestDTO){

        const { user, token } = await this.authService.register(body)

        response.cookie('token', token)
        return user;
    }
}