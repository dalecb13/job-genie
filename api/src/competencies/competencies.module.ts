import { Module } from '@nestjs/common';
import { CompetenciesController } from './competencies.controller';
import { CompetenciesService } from './competencies.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CompetenciesController],
  providers: [CompetenciesService],
  imports: [PrismaModule],
})
export class CompetenciesModule {}
