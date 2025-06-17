import { Module } from '@nestjs/common';
import { JobScraperController } from './job-scraper.controller';
import { JobScraperService } from './job-scraper.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JobScraperController],
  providers: [JobScraperService],
  imports: [PrismaModule],
})
export class JobScraperModule {}
