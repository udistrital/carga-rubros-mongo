import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesActividadMapperService } from './plan-adquisiciones-actividad-mapper.service';

describe('PlanAdquisicionesActividadMapperService', () => {
  let service: PlanAdquisicionesActividadMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesActividadMapperService],
    }).compile();

    service = module.get<PlanAdquisicionesActividadMapperService>(PlanAdquisicionesActividadMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
