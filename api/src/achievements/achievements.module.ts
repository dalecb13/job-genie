import { Module } from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AchievementsController],
  providers: [AchievementsService],
  imports: [PrismaModule],
})
export class AchievementsModule {}
