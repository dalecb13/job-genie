import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async companies(params: { skip: number; take: number }): Promise<Company[]> {
    const { skip, take } = params;
    const companies = await this.prisma.company.findMany({
      skip,
      take,
      orderBy: {
        companyName: 'asc',
      },
    });

    return companies;
  }

  async createCompany(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }
}
