import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { TechnologyDomain } from 'src/models/technology.domain';
import { CompetencyDomain } from 'src/models/competency.domain';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  createApplication(
    @Body() applicationData: { jobDescriptionId: string },
  ): Promise<any> {
    const { jobDescriptionId } = applicationData;
    return this.applicationsService.createApplication({ jobDescriptionId });
  }

  @Get()
  getApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get(':id')
  getApplication(@Body() applicationData: { id: string }) {
    const { id } = applicationData;
    return this.applicationsService.getApplication(id);
  }

  @Put()
  updateApplication(
    @Body()
    applicationData: {
      id: string;
      technologies: TechnologyDomain[];
      competencies: CompetencyDomain[];
    },
  ) {
    const { id, technologies, competencies } = applicationData;
    return this.applicationsService.updateApplication(
      id,
      technologies,
      competencies,
    );
  }
}
