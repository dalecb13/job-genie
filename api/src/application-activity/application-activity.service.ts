import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationActivityService {
  constructor(private prisma: PrismaService) {}

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
