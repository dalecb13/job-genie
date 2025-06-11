import { Module } from '@nestjs/common';
import { JobDescriptionController } from './job-description.controller';
import { JobDescriptionService } from './job-description.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  controllers: [JobDescriptionController],
  providers: [JobDescriptionService],
  imports: [PrismaModule, CompanyModule],
})
export class JobDescriptionModule {}
