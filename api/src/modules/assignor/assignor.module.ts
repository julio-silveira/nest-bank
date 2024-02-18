import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { PrismaGlobalModule } from '../prisma/prisma.global.module';

@Module({
  imports: [PrismaGlobalModule],
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class AssignorModule {}
