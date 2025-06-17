import { Module } from '@nestjs/common';
import { ExtractController } from './extract.controller';
import { ExtractService } from './extract.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExtractController],
  providers: [ExtractService],
  imports: [PrismaModule],
})
export class ExtractModule {}
