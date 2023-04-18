import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { HelperModule } from './helper/helper.module';
import { HelperService } from './helper/helper.service';
import { LoggingInterceptor } from './helper/logging.interceptor';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: false, disableErrorMessages: false}));
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(configService.env.port);
}

bootstrap();
