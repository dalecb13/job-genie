import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkExperienceDto } from './work-experience.model';

@Injectable()
export class WorkExperiencesService {
  constructor(private prisma: PrismaService) {}

  async getWorkExperiences() {
    return await this.prisma.workExperience.findMany();
  }

  async createWorkExperience(dto: CreateWorkExperienceDto) {
    return await this.prisma.workExperience.create({
      data: {
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        location: dto.location,
        jobTitle: {
          connect: {
            id: dto.jobTitleId,
          },
        },
        company: {
          connect: {
            id: dto.companyId,
          },
        },
      },
    });
  }
}
