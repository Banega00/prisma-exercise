
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { configService } from 'src/config/config.service';
import * as dotenv from "dotenv";
dotenv.config();
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor(){
        super({
            datasources:{
                db:{
                    url: configService.db_url()
                }
            }
        })
    }

    
    async onModuleInit() {
      await this.$connect();
    }
  
    async enableShutdownHooks(app: INestApplication) {
      this.$on('beforeExit', async () => {
        await app.close()
      })
    }
  }