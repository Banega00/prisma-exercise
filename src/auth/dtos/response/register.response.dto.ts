import { ResponseDTO } from ".";

export class RegisterResponseDTO extends ResponseDTO{

    constructor() {
        super();
        
    }
    
    id: string;
    
    email: string;

    name: string;
}