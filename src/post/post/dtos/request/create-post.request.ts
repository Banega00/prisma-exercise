import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePost{

    @IsNotEmpty()
    @IsString()
    @Length(5)
    title:string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 1000)
    content: string;
    
    @IsBoolean()
    @IsOptional()
    published?: boolean;
}