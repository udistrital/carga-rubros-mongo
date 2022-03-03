import { Test, TestingModule } from '@nestjs/testing';
import { RegistroInversionActividadFuenteRepositoryService } from './registro-inversion-actividad-fuente-repository.service';

describe('RegistroInversionActividadFuenteRepositoryService', () => {
  let service: RegistroInversionActividadFuenteRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroInversionActividadFuenteRepositoryService],
    }).compile();

    service = module.get<RegistroInversionActividadFuenteRepositoryService>(RegistroInversionActividadFuenteRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
