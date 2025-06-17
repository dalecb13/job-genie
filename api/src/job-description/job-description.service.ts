import { Injectable } from '@nestjs/common';
import { JobDescription, Prisma, WorkType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobDescriptionService {
  constructor(private prisma: PrismaService) {}

  async jobDescriptions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobDescriptionWhereUniqueInput;
    where?: Prisma.JobDescriptionWhereInput;
    orderBy?: Prisma.JobDescriptionOrderByWithRelationInput;
  }): Promise<JobDescription[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.jobDescription.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        company: true,
        jobTitle: true,
      },
    });
  }

  async createJobDescription(data: {
    link: string;
    rawText: string;
    companyId: string;
    jobTitleId: string;
    workType: string;
    location: string;
  }): Promise<JobDescription> {
    const wt = data.workType as WorkType;

    return this.prisma.jobDescription.create({
      data: {
        link: data.link,
        rawText: data.rawText,
        workType: wt,
        location: data.location,
        jobTitle: {
          connect: {
            id: data.jobTitleId,
          },
        },
        company: {
          connect: {
            id: data.companyId,
          },
        },
      },
    });
  }

  getJobDescriptionById(id: string) {
    return this.prisma.jobDescription.findUnique({
      where: { id },
      include: {
        company: true,
        jobTitle: true,
      },
    });
  }

  updateJobDescription(params: {
    where: Prisma.JobDescriptionWhereUniqueInput;
    data: Prisma.JobDescriptionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.jobDescription.update({
      data,
      where,
    });
  }

  deleteJobDescription(where: Prisma.JobDescriptionWhereUniqueInput) {
    return this.prisma.jobDescription.delete({
      where,
    });
  }
}
