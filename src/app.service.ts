import { Injectable } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){
  }

  getHello(): string {
    return 'Hello World!';
  }
}
