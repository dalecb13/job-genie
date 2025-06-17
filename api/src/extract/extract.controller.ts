import { Controller, Post } from '@nestjs/common';
import { ExtractService } from './extract.service';

@Controller('extract')
export class ExtractController {
  constructor(private readonly extractService: ExtractService) {}

  @Post('technologies')
  extractTechnologies(description: string) {
    return this.extractService.extractTechnologies(description);
  }
}
