import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import CustomError from "src/helper/custom-error";
import { HelperService } from "src/helper/helper.service";
import { ErrorStatusCode } from "src/helper/status-codes";
import { PrismaService } from "src/prisma/prisma.service";
import * as DTO from '../post/dtos'


@Injectable()
export class PostService {
    
    constructor(private prisma: PrismaService, private helperService: HelperService){}

    async createPost(body: DTO.Request.CreatePost, user: User | undefined) {
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

        return post;
    }

    async updatePost(body: DTO.Request.UpdatePost, user: User | undefined) {
        if(!user || !user.id){
            throw new CustomError({code: ErrorStatusCode.UNAUTHORIZED, status: 401, message:'You have to be logged in to create a post'})
        }

        const post = await this.prisma.post.findUnique({where : {id: body.id}})

        if(!post) throw new CustomError({code: ErrorStatusCode.POST_NOT_FOUND, status: 404, message:`Post with id: ${body.id} not found`})
    
        if(post.authorId !== user.id) throw new CustomError({code: ErrorStatusCode.FORBIDDEN, status: 403, message:'You are not authorized to update this post'})
    
        const updateData = {};
        
        if(body.title) updateData['title'] = body.title;
        if(body.content) updateData['content'] = body.content;
        if(body.published) updateData['published'] = body.published;

        const updatedPost = await this.prisma.post.update({
            where: {id: body.id},
            data: updateData
        })

        return updatedPost;
    }

    async deletePost(id: number, user: User | undefined) {
        if(!user || !user.id){
            throw new CustomError({code: ErrorStatusCode.UNAUTHORIZED, status: 401, message:'You have to be logged in to create a post'})
        }

        const post = await this.prisma.post.findUnique({where : { id }})

        if(!post) throw new CustomError({code: ErrorStatusCode.POST_NOT_FOUND, status: 404, message:`Post with id: ${ id } not found`})
    
        if(post.authorId !== user.id) throw new CustomError({code: ErrorStatusCode.FORBIDDEN, status: 403, message:'You are not authorized to update this post'})

        await this.prisma.post.delete({where: {id}})

    }

    async getPost(id: number) {

        const post = await this.prisma.post.findUnique({where : { id }})

        if(!post) throw new CustomError({code: ErrorStatusCode.POST_NOT_FOUND, status: 404, message:`Post with id: ${ id } not found`})
    
        return post;

    }

    
}