import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JobDescriptionService } from './job-description.service';
import { JobDescription, WorkType } from '@prisma/client';

@Controller('job-descriptions')
export class JobDescriptionController {
  constructor(private readonly jobDescriptionService: JobDescriptionService) {}

  @Get()
  getJobDescriptions(): Promise<JobDescription[]> {
    return this.jobDescriptionService.jobDescriptions({});
  }

  @Get(':id')
  getJobDescriptionById(@Param() params: any): Promise<JobDescription> {
    const { id } = params;
    return this.jobDescriptionService.getJobDescriptionById(id);
  }

  @Put()
  updateJobDescriptionById(
    @Body() jobDescriptionData: { id: string; rawText: string },
  ): Promise<JobDescription> {
    const { id, rawText } = jobDescriptionData;
    return this.jobDescriptionService.updateJobDescription({
      where: { id },
      data: { rawText },
    });
  }

  @Post()
  createJobDescription(
    @Body()
    jobDescriptionData: {
      link: string;
      rawText: string;
      companyId: string;
      jobTitleId: string;
      workType: string;
      location: string;
    },
  ): Promise<JobDescription> {
    const { link, rawText, companyId, jobTitleId, workType, location } =
      jobDescriptionData;
    const wt: WorkType = workType as WorkType;
    return this.jobDescriptionService.createJobDescription({
      link,
      rawText,
      companyId,
      jobTitleId,
      workType: wt,
      location,
    });
  }

  @Delete(':id')
  deleteJobDescriptionById(@Param() params: any) {
    const { id } = params;
    return this.jobDescriptionService.deleteJobDescription({ id });
  }
}
