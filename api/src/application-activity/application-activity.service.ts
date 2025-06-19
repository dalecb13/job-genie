import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationActivityService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities() {
    return this.prisma.activityLog.findMany({
      orderBy: {
        activityDate: 'desc',
      },
    });
  }

  async getActivities(applicationId: string) {
    return this.prisma.activityLog.findMany({
      where: {
        application: {
          id: applicationId,
        },
      },
      orderBy: {
        activityDate: 'desc',
      },
    });
  }

  async addActivity(
    applicationId: string,
    activityDate: Date,
    activityType: string,
    activityDetails: string,
  ) {
    return this.prisma.activityLog.create({
      data: {
        application: {
          connect: {
            id: applicationId,
          },
        },
        activityDate,
        activityType,
        note: activityDetails,
      },
    });
  }
}
