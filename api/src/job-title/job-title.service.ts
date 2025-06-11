import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobTitle, Prisma } from '@prisma/client';

@Injectable()
export class JobTitleService {
  constructor(private prisma: PrismaService) {}

  async jobTitle(
    jobTitleWhereUniqueInput: Prisma.JobTitleWhereUniqueInput,
  ): Promise<JobTitle | null> {
    return this.prisma.jobTitle.findUnique({
      where: jobTitleWhereUniqueInput,
    });
  }

  async jobTitles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobTitleWhereUniqueInput;
    where?: Prisma.JobTitleWhereInput;
    orderBy?: Prisma.JobTitleOrderByWithRelationInput;
  }): Promise<JobTitle[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.jobTitle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createJobTitle(data: Prisma.JobTitleCreateInput): Promise<JobTitle> {
    return this.prisma.jobTitle.create({
      data,
    });
  }

  async updateJobTitle(params: {
    where: Prisma.JobTitleWhereUniqueInput;
    data: Prisma.JobTitleUpdateInput;
  }): Promise<JobTitle> {
    const { where, data } = params;
    return this.prisma.jobTitle.update({
      data,
      where,
    });
  }

  async deleteJobTitle(
    where: Prisma.JobTitleWhereUniqueInput,
  ): Promise<JobTitle> {
    return this.prisma.jobTitle.delete({
      where,
    });
  }
}
