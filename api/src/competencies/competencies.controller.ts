import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompetenciesService } from './competencies.service';

@Controller('competencies')
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}

  @Get()
  getAllCompetencies() {
    return this.competenciesService.getAllCompetencies();
  }

  @Post()
  createCompetency(@Body() data: { name: string }) {
    return this.competenciesService.createCompetency(data.name);
  }
}
