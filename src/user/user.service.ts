import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async getAllUsers(includePosts: boolean = false) {
        const users = await this.prisma.user.findMany({
            include: {
                posts: includePosts
            }
        });

        return users;
    }

}