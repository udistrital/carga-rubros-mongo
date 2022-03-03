import { Test, TestingModule } from '@nestjs/testing';
import { RegistroInversionActividadFuenteService } from './registro-inversion-actividad-fuente.service';

describe('RegistroInversionActividadFuenteService', () => {
  let service: RegistroInversionActividadFuenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroInversionActividadFuenteService],
    }).compile();

    service = module.get<RegistroInversionActividadFuenteService>(RegistroInversionActividadFuenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
