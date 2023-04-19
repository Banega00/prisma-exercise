import { Role } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { RequestDTO } from "./index"

export class RegisterRequestDTO extends RequestDTO{

    constructor() {
        super();
        
    }
    
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string

    @IsNotEmpty()
    @IsString()
    name: string

    @Transform(param => param.value?.toUpperCase() || Role.USER)
    @IsEnum(Role)
    role: Role = Role.USER;
}