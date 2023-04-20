import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Res, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import * as DTO from '../post/dtos'
import { AuthGuard } from "src/auth/auth.guard";
import { Response } from 'express'
import { StatusCode } from "src/helper/status-code.interceptor";
import { SuccessStatusCode } from "src/helper/status-codes";
@Controller('post')
export class PostController{

    constructor(private readonly postService: PostService) {
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getPost(@Param('id', ParseIntPipe) id:number){
        return await this.postService.getPost(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @StatusCode(SuccessStatusCode.POST_CREATED)
    async createPost(@Res({passthrough: true}) response: Response, @Body() body: DTO.Request.CreatePost){
        const user = response.locals.user;
        return await this.postService.createPost(body, user);
    }

    @Put()
    @UseGuards(AuthGuard)
    @StatusCode(SuccessStatusCode.POST_UPDATED)
    async updatePost(@Res({passthrough: true}) response: Response, @Body() body: DTO.Request.UpdatePost){
        const user = response.locals.user;
        return await this.postService.updatePost(body, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @StatusCode(SuccessStatusCode.POST_DELETED)
    async deletePost(@Res({passthrough: true}) response: Response, @Param('id', ParseIntPipe) id:number){
        const user = response.locals.user;
        return await this.postService.deletePost(id, user);
    }
}