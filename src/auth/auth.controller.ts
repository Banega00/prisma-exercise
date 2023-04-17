import { Body, Controller, Post, Put } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { SuccessStatusCode } from "src/helper/status-codes";
import { AuthService } from "./auth.service";
import * as DTO from '../auth/dtos/index'
@Controller()
export class AuthController{

    constructor(private authService: AuthService, private helperService: HelperService){

    }

    @Put('login')
    async login(@Body() body: DTO.Request.LoginRequestDTO){
        
        await this.authService.login(body.email, body.password)

        return this.helperService.sendResponse({message: "Successful login", data: {}, statusCode: SuccessStatusCode.Success})
    }
}