import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { CustomResponse } from "./custom-response";
import { getStatusCodeDescription, SuccessStatusCode } from "./status-codes";

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(map((payload) => {
        const statusCode = response.successStatusCode || 20000;
        const message = response.message || getStatusCodeDescription(statusCode);
        const status = response.statusCode || 200;
        return ({ status, statusCode, message, payload })
      }
      ));
  }
}