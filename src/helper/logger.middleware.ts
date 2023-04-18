import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Router Logger');

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.log(`${request.method} ${request.url}`);
    next();
  }
}