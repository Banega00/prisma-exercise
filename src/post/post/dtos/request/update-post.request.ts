import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdatePost{

    @IsNotEmpty()
    @IsInt({})
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(5)
    @IsOptional()
    title:string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 1000)
    @IsOptional()
    content: string;
    
    @IsBoolean()
    @IsOptional()
    published?: boolean;
}