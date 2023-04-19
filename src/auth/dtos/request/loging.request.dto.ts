import { IsNotEmpty, IsString, Length } from "class-validator"
import { RequestDTO } from "."

export class LoginRequestDTO extends RequestDTO{

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
}