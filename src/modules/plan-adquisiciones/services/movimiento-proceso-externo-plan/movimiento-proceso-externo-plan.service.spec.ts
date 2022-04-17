import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoProcesoExternoPlanService } from './movimiento-proceso-externo-plan.service';

describe('MovimientoProcesoExternoPlanService', () => {
  let service: MovimientoProcesoExternoPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoProcesoExternoPlanService],
    }).compile();

    service = module.get<MovimientoProcesoExternoPlanService>(MovimientoProcesoExternoPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
