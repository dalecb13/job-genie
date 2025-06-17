import { Test, TestingModule } from '@nestjs/testing';
import { JobScraperService } from './job-scraper.service';

describe('JobScraperService', () => {
  let service: JobScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobScraperService],
    }).compile();

    service = module.get<JobScraperService>(JobScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
