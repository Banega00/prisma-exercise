import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { CustomResponse } from "./custom-response";
import { getStatusCodeDescription, SuccessStatusCode } from "./status-codes";

export const StatusCode = (code: number) => UseInterceptors(new StatusCodeInterceptor(code));
@Injectable()
class StatusCodeInterceptor<T> implements NestInterceptor<T, CustomResponse<T>>{
  constructor(private readonly successStatusCode: SuccessStatusCode) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    const response = context.switchToHttp().getResponse();
    response.successStatusCode = this.successStatusCode;

    return next.handle()
  }
}