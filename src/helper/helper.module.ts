import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { LoggerMiddleware } from './logger.middleware';

@Global()
@Module({
    providers: [HelperService],
    exports: [HelperService],
})
export class HelperModule {}
