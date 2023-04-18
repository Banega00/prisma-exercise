import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from "@nestjs/common";
import { catchError, Observable, tap, throwError} from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
          tap(() => console.log(`After... ${Date.now() - now}ms`)),
          catchError(err => {

            console.log(`After... ${Date.now() - now}ms`);
            return throwError(() => new BadGatewayException())
          }),
      );
  }
}