import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesActividadRepositoryService } from './plan-adquisiciones-actividad-repository.service';

describe('PlanAdquisicionesActividadRepositoryService', () => {
  let service: PlanAdquisicionesActividadRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesActividadRepositoryService],
    }).compile();

    service = module.get<PlanAdquisicionesActividadRepositoryService>(PlanAdquisicionesActividadRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
