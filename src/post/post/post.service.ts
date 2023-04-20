import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import CustomError from "src/helper/custom-error";
import { HelperService } from "src/helper/helper.service";
import { ErrorStatusCode } from "src/helper/status-codes";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePost } from "./dtos/request";


@Injectable()
export class PostService {
    
    constructor(private prisma: PrismaService, private helperService: HelperService){}

    async createPost(body: CreatePost, user: User | undefined) {
        if(!user || !user.id){
            throw new CustomError({code: ErrorStatusCode.UNAUTHORIZED, status: 401, message:'You have to be logged in to create a post'})
        }

        const post = await this.prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                published: body.published,
                authorId: user.id
            }
        })
    }
}