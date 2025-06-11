import { Body, Controller, Get, Post } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  getAllTechnologies() {
    return this.technologiesService.getAllTechnologies();
  }

  @Post()
  createTechnologies(@Body() data: { name: string }) {
    return this.technologiesService.createTechnology(data.name);
  }
}
