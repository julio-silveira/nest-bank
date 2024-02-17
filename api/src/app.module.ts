import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './payables/payables.module';

@Module({
  imports: [PayablesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
