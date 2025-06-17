import { Body, Controller, Post } from '@nestjs/common';
import { JobScraperService } from './job-scraper.service';

@Controller('job-scraper')
export class JobScraperController {
  constructor(private service: JobScraperService) {}

  @Post()
  async handleJobScrapingRequest(
    @Body() body: { jobDescriptionLink: string },
  ): Promise<void> {
    const { jobDescriptionLink } = body;
    await this.service.scrape(jobDescriptionLink);
  }
}
