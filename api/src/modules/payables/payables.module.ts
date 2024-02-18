import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { AssignorModule } from '../assignor/assignor.module';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService],
  imports: [AssignorModule],
})
export class PayablesModule {}
