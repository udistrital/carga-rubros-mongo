import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPlanAdquisicionesService } from './registro-plan-adquisiciones-service.service';

describe('RegistroPlanAdquisicionesService', () => {
  let service: RegistroPlanAdquisicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPlanAdquisicionesService],
    }).compile();

    service = module.get<RegistroPlanAdquisicionesService>(RegistroPlanAdquisicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
