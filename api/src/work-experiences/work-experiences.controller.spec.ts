import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperiencesController } from './work-experiences.controller';

describe('WorkExperiencesController', () => {
  let controller: WorkExperiencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkExperiencesController],
    }).compile();

    controller = module.get<WorkExperiencesController>(WorkExperiencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
