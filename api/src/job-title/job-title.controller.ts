import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { JobTitle } from '@prisma/client';
import { JobTitleService } from './job-title.service';

@Controller('job-title')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Get()
  async getJobtitles(): Promise<JobTitle[]> {
    return this.jobTitleService.jobTitles({});
  }

  @Post()
  async createJobTitle(
    @Body() jobTitleData: { title: string },
  ): Promise<JobTitle> {
    const { title } = jobTitleData;
    return this.jobTitleService.createJobTitle({ title });
  }

  @Delete()
  async deleteJobTitle(
    @Body() jobTitleData: { title: string },
  ): Promise<JobTitle> {
    const { title } = jobTitleData;
    return this.jobTitleService.deleteJobTitle({ title });
  }
}
