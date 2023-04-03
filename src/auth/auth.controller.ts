import { Controller, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{

    constructor(private authService: AuthService){

    }

    @Put('login')
    login(){
        // return this.authService.login();
        return true;
    }
}