import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import Blogger from "./blogger";
import { Request, Response } from 'express';
import CustomError from "./custom-error";
import { configService } from "src/config/config.service";
import { ErrorStatusCode, getStatusCodeDescription } from "./status-codes";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Blogger('Exception Handler');

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        //logic for validation exceptions
        if(exception instanceof BadRequestException){
            const message = exception.message || getStatusCodeDescription(ErrorStatusCode.VALIDATION_ERROR);
            this.logger.error(message, exception);

            //give validation details only in development environment
            const errorPayload = configService.env.environment?.startsWith("dev") ? (exception as any).response.message : undefined;

            return response.status(400).json({
                statusCode: ErrorStatusCode.VALIDATION_ERROR,
                message: message,
                payload: errorPayload,
                status: 400
            })
        }

        if(exception instanceof NotFoundException){
            return response.status(404).json({
                statusCode: 10000,
                message: 'Route not found',
                payload: undefined,
                status: 404
            })
        }

        if (exception instanceof CustomError) {
            const message = exception.message || getStatusCodeDescription(exception.code);
            this.logger.error(message, exception)

            return response.status(exception.status).json({
                statusCode: exception.code,
                message: message,
                payload: exception.payload,
                status: exception.status
            })
        }

        this.logger.error(exception.message, exception);

        //send info about error stack in response if environment is development
        const errorPayload = configService.env.environment?.startsWith("dev") ? exception.stack : undefined;

        response.status(500).json({
            statusCode: ErrorStatusCode.UNKNOWN_ERROR,
            message: exception.message || getStatusCodeDescription(ErrorStatusCode.UNKNOWN_ERROR) ,
            payload: errorPayload,
            status: 500
        })
    }
}