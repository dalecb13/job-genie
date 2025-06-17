import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationActivityController } from './application-activity.controller';

describe('ApplicationActivityController', () => {
  let controller: ApplicationActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationActivityController],
    }).compile();

    controller = module.get<ApplicationActivityController>(ApplicationActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
