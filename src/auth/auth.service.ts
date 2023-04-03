import { PrismaService } from "src/prisma/prisma.service";

export class AuthService{
    
    constructor(private prisma: PrismaService){
        
    }

    login() {
        console.log("OVDE")
        throw new Error("Method not implemented.");
    }
}