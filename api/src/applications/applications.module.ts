import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ApplicationActivityModule } from 'src/application-activity/application-activity.module';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  imports: [PrismaModule, ApplicationActivityModule],
})
export class ApplicationsModule {}
