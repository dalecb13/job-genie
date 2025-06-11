import { Module } from '@nestjs/common';
import { WorkExperiencesController } from './work-experiences.controller';
import { WorkExperiencesService } from './work-experiences.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WorkExperiencesController],
  providers: [WorkExperiencesService],
  imports: [PrismaModule],
})
export class WorkExperiencesModule {}
