import { IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterRequestDTO{
    
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
}