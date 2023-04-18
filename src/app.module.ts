import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, HelperModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
