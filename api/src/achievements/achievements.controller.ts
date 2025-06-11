import { Controller, Get, Post } from '@nestjs/common';
import { AchievementsService } from './achievements.service';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  getAllAchievements() {
    return this.achievementsService.getAllAchievements();
  }

  @Post()
  createAchievement(description: string) {
    return this.achievementsService.createAchievement(description);
  }
}
