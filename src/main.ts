import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import Blogger from './helper/blogger';
import { GlobalExceptionFilter } from './helper/global-exception-filter';
import { ResponseInterceptor } from './helper/response.interceptor';
import * as cookieParser from 'cookie-parser';
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}


async function bootstrap() {

  const app = await NestFactory.create(AppModule, {logger: false});
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.use(Blogger.logExpressRoute)
  app.useGlobalPipes(new ValidationPipe({transform: true, disableErrorMessages: false}));

  const logger = new Blogger('TEST');

  logger.info('Starting application...');
  await app.listen(configService.env.port);
}

bootstrap();
