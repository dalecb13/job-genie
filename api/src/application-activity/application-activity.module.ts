import { Module } from '@nestjs/common';
import { ApplicationActivityController } from './application-activity.controller';
import { ApplicationActivityService } from './application-activity.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ApplicationActivityController],
  providers: [ApplicationActivityService],
  imports: [PrismaModule],
  exports: [ApplicationActivityService],
})
export class ApplicationActivityModule {}
