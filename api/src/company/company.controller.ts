import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies(@Query('skip') skip: number, @Query('take') take: number) {
    return this.companyService.companies({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Post()
  async createCompany(
    @Body() companyData: { companyName: string; link?: string },
  ): Promise<Company> {
    const { companyName, link } = companyData;
    return this.companyService.createCompany({
      companyName,
      link,
    });
  }
}
