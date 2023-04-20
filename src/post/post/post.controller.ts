import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import * as DTO from '../post/dtos'
import { AuthGuard } from "src/auth/auth.guard";

@Controller('post')
export class PostController{

    constructor(private readonly postService: PostService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    async createPost(@Res({passthrough: true}) response, @Body() body: DTO.Request.CreatePost){
        const user = response.locals.user;
        return await this.postService.createPost(body, user);
    }
}