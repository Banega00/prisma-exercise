import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as DTO from '../auth/dtos/index'
@Injectable()
export class AuthService{
    
    constructor(private prisma: PrismaService){
    }

    async login(email: string, password: string) {
        console.log("email: ", email)
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        //TODO hashing passwords
        if(user.password !== password){
            throw new Error("Incorrect password")
        }

        return user
    }

    async register(userData: DTO.Request.RegisterRequestDTO) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if(existingUser){
            throw new Error("User already exists")
        }

        const user = await this.prisma.user.create({data: {
            email: userData.email,
            name: userData.name,
            password: userData.password
        }})

        return user;
    }
}