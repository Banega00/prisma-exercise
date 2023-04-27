import { Controller, Get, ParseBoolPipe, Query, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { OptionalQueryParam } from "src/helper/optional-query-param-pipe";
import { Roles } from "./user-roles.enum";
import { UserService } from "./user.service";


@Controller('user')
@UseGuards(AuthGuard)
export class UserController{
    
    constructor(private readonly userService: UserService){

    }

    //simple get route
    @Get()
    async getUsers(@Query('posts', new OptionalQueryParam(new ParseBoolPipe())) posts: boolean){
        return await this.userService.getAllUsers(posts == true);
    }

    @Get('/admin-only-route')
    @Roles(Role.ADMIN)
    adminRoute(){
        return { message: 'Success!'}
    }
}