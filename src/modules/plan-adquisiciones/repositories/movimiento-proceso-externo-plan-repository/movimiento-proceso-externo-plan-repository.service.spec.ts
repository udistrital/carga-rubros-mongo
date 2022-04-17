import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoProcesoExternoPlanRepositoryService } from './movimiento-proceso-externo-plan-repository.service';

describe('MovimientoProcesoExternoPlanRepositoryService', () => {
  let service: MovimientoProcesoExternoPlanRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoProcesoExternoPlanRepositoryService],
    }).compile();

    service = module.get<MovimientoProcesoExternoPlanRepositoryService>(MovimientoProcesoExternoPlanRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
