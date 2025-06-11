import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  getAllAchievements() {
    return this.prisma.achievement.findMany();
  }

  createAchievement(description: string) {
    return this.prisma.achievement.create({
      data: {
        description,
      },
    });
  }
}
