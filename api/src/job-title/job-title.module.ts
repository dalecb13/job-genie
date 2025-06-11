import { Module } from '@nestjs/common';
import { JobTitleController } from './job-title.controller';
import { JobTitleService } from './job-title.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JobTitleController],
  providers: [JobTitleService],
  imports: [PrismaModule],
})
export class JobTitleModule {}
