import { ResponseDTO } from "./index"

export class LoginResponseDTO extends ResponseDTO{

    constructor() {
        super();
        
    }
    
    id: string;

    email: string;

    name: string;

    format(){
        return this;
    }
}