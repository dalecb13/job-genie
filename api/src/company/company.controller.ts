import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies(): Promise<Company[]> {
    return this.companyService.companies({});
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
