import { IsNotEmpty, IsString, Length } from "class-validator"
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
}