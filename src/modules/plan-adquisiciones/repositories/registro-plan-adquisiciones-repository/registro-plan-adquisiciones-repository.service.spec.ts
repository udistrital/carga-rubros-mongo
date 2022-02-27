import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPlanAdquisicionesRepositoryService } from './registro-plan-adquisiciones-repository.service';

describe('RegistroPlanAdquisicionesRepositoryService', () => {
  let service: RegistroPlanAdquisicionesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPlanAdquisicionesRepositoryService],
    }).compile();

    service = module.get<RegistroPlanAdquisicionesRepositoryService>(RegistroPlanAdquisicionesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
