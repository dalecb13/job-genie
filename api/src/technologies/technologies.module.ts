import { Module } from '@nestjs/common';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
  imports: [PrismaModule],
})
export class TechnologiesModule {}
