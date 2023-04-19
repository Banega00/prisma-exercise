import { Body, Controller, Post, Put, UseInterceptors } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { SuccessStatusCode } from "src/helper/status-codes";
import { AuthService } from "./auth.service";
import * as DTO from '../auth/dtos/index'
import { StatusCodeInterceptor } from "src/helper/status-code.interceptor";
@Controller()
export class AuthController{

    constructor(private authService: AuthService, private helperService: HelperService){

    }

    @Post('login')
    @UseInterceptors(new StatusCodeInterceptor(SuccessStatusCode.SUCCESSFUL_LOGIN))
    async login(@Body() body: DTO.Request.LoginRequestDTO){
        
        return await this.authService.login(body.email, body.password)
    }
    @Post('register')
    @UseInterceptors(new StatusCodeInterceptor(SuccessStatusCode.SUCCESSFUL_REGISTRATION))
    async register(@Body() body: DTO.Request.RegisterRequestDTO){
        
        return await this.authService.register(body)
    }
}