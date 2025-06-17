import { Test, TestingModule } from '@nestjs/testing';
import { JobScraperController } from './job-scraper.controller';

describe('JobScraperController', () => {
  let controller: JobScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobScraperController],
    }).compile();

    controller = module.get<JobScraperController>(JobScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
