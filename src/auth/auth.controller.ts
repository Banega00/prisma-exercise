import { Body, Controller, Post, Put } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { SuccessStatusCode } from "src/helper/status-codes";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{

    constructor(private authService: AuthService, private helperService: HelperService){

    }

    @Put('login')
    async login(@Body('email') email: string, @Body('password') password: string){
        await this.authService.login(email, password)
        return this.helperService.sendResponse({message: "Successful login", data: {}, statusCode: SuccessStatusCode.Success})
    }
}