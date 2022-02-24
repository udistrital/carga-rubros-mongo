import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesService } from './plan-adquisiciones.service';

describe('PlanAdquisicionesService', () => {
  let service: PlanAdquisicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesService],
    }).compile();

    service = module.get<PlanAdquisicionesService>(PlanAdquisicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
