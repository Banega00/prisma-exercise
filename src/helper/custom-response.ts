import { ErrorStatusCode, SuccessStatusCode } from "./status-codes";

export class CustomResponse<T = any>{
    status: number;
    message: string;
    payload: T;
    statusCode: SuccessStatusCode | ErrorStatusCode;

    constructor(obj: Partial<CustomResponse>){
        this.status = obj.status;
        this.message = obj.message;
        this.payload = obj.payload;
        this.statusCode = obj.statusCode;
    }
}