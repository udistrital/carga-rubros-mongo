import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesRepositoryService } from './plan-adquisiciones-repository.service';

describe('PlanAdquisicionesRepositoryService', () => {
  let service: PlanAdquisicionesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesRepositoryService],
    }).compile();

    service = module.get<PlanAdquisicionesRepositoryService>(PlanAdquisicionesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
