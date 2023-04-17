import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    
    constructor(private prisma: PrismaService){
    }

    async login(email: string, password: string) {
        console.log("email: ", email)
        const user = await this.prisma.user.findUnique({
            where: {
                email: 'test'
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        if(user.password !== password){
            throw new Error("Incorrect password")
        }

        return user
    }
}