import { Test, TestingModule } from '@nestjs/testing';
import { PlanAdquisicionesActividadService } from './plan-adquisiciones-actividad.service';

describe('PlanAdquisicionesActividadService', () => {
  let service: PlanAdquisicionesActividadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAdquisicionesActividadService],
    }).compile();

    service = module.get<PlanAdquisicionesActividadService>(PlanAdquisicionesActividadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
