import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationActivityService } from './application-activity.service';

describe('ApplicationActivityService', () => {
  let service: ApplicationActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationActivityService],
    }).compile();

    service = module.get<ApplicationActivityService>(ApplicationActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
