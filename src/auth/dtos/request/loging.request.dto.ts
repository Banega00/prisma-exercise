import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginRequestDTO{
    
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string
}