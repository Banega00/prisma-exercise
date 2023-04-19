import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as DTO from '../auth/dtos/index'
import CustomError from "src/helper/custom-error";
import { ErrorStatusCode, SuccessStatusCode } from "src/helper/status-codes";
import { HelperService } from "src/helper/helper.service";
@Injectable()
export class AuthService{
    
    constructor(private prisma: PrismaService, private helperService: HelperService){
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            throw new CustomError({code: ErrorStatusCode.USER_NOT_FOUND, status: 404})
        }

        const isValid = this.helperService.verifyPassword(password, user.password)
        if(!this.helperService.verifyPassword(password, user.password)){
            throw new CustomError({code: ErrorStatusCode.INVALID_PASSWORD, status: 400})
        };

        return { user: {...user, password: undefined }, token: this.helperService.signJWT({ id: user.id, email: user.email, role: user.role })}
    }

    async register(userData: DTO.Request.RegisterRequestDTO) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if(existingUser){
            throw new CustomError({code: ErrorStatusCode.USER_ALREADY_EXISTS, status: 400})
        }

        const hashedPassword = this.helperService.hashPassword(userData.password)

        const user = await this.prisma.user.create({data: {
            email: userData.email,
            name: userData.name,
            role: userData.role,
            password: hashedPassword
        }})

        return { user: {...user, password: undefined }, token: this.helperService.signJWT({ id: user.id, email: user.email, role: user.role })}
    }
}
