import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoProcesoExternoPlanMapperService } from './movimiento-proceso-externo-plan-mapper.service';

describe('MovimientoProcesoExternoPlanMapperService', () => {
  let service: MovimientoProcesoExternoPlanMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoProcesoExternoPlanMapperService],
    }).compile();

    service = module.get<MovimientoProcesoExternoPlanMapperService>(MovimientoProcesoExternoPlanMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
