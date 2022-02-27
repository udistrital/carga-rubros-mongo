import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPlanAdquisicionesMapperService } from './registro-plan-adquisiciones-mapper.service';

describe('RegistroPlanAdquisicionesMapperService', () => {
  let service: RegistroPlanAdquisicionesMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPlanAdquisicionesMapperService],
    }).compile();

    service = module.get<RegistroPlanAdquisicionesMapperService>(RegistroPlanAdquisicionesMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
