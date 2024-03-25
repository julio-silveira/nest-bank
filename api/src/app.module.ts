import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './modules/payables/payables.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PrismaGlobalModule } from './modules/prisma/prisma.global.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Global Modules
    PrismaGlobalModule,
    // Non-Global Modules
    AuthModule,
    AssignorModule,
    PayablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
