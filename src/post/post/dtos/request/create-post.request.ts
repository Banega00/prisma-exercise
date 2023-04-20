import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePost{

    @IsNotEmpty()
    @IsString()
    @Length(5)
    title:string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 1000)
    content: string;
    
    published?: boolean;
}