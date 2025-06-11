import { Controller, Post } from '@nestjs/common';
import { WorkExperiencesService } from './work-experiences.service';
import { CreateWorkExperienceDto } from './work-experience.model';

@Controller('work-experiences')
export class WorkExperiencesController {
  constructor(
    private readonly workExperiencesService: WorkExperiencesService,
  ) {}

  @Post()
  async createWorkExperience(dto: CreateWorkExperienceDto) {
    return await this.workExperiencesService.createWorkExperience(dto);
  }
}
