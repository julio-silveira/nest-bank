import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './modules/payables/payables.module';
import { PrismaGlobalModule } from './modules/prisma/prisma.global.module';

@Module({
  imports: [
    // Global Modules
    PrismaGlobalModule,
    // Non-Global Modules
    PayablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
