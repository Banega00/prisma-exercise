import { Global, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
    imports: [UserModule]
})
export class PrismaModule {}
