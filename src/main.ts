import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import Blogger from './helper/blogger';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Blogger.logExpressRoute)
  app.useGlobalPipes(new ValidationPipe({transform: false, disableErrorMessages: false}));
  await app.listen(configService.env.port);
}

bootstrap();
