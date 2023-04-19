import { Controller, Get, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "./user-roles.enum";


@Controller('user')
@UseGuards(AuthGuard)
export class UserController{
    

    //simple get route
    @Get()
    testRoute(){
        return { message: 'Works!'}
    }

    @Get('/admin-only-route')
    @Roles(Role.ADMIN)
    adminRoute(){
        return { message: 'Success!'}
    }
}