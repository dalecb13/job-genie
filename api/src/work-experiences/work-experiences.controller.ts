import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkExperiencesService } from './work-experiences.service';

@Controller('work-experiences')
export class WorkExperiencesController {
  constructor(
    private readonly workExperiencesService: WorkExperiencesService,
  ) {}

  @Get()
  async getWorkExperiences() {
    return await this.workExperiencesService.getWorkExperiences();
  }

  @Post()
  async createWorkExperience(
    @Body()
    dto: {
      startDate: string;
      endDate: string;
      location: string;
      description: string;
      jobTitleId: string;
      companyId: string;
    },
  ) {
    const { startDate, endDate, location, description, jobTitleId, companyId } =
      dto;
    return await this.workExperiencesService.createWorkExperience({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      description,
      jobTitleId,
      companyId,
    });
  }
}
