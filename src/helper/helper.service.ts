import { Injectable } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ErrorStatusCode, SuccessStatusCode } from "./status-codes";

@Injectable()
export class HelperService{
    
    sendResponse(obj:{statusCode: SuccessStatusCode | ErrorStatusCode, message?:string, data?: any}){
        return {
            statusCode: obj.statusCode,
            message: obj.message,
            data: obj.data
        }
    }
}