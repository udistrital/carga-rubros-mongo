import { Test, TestingModule } from '@nestjs/testing';
import { RegistroInversionActividadFuenteMapperService } from './registro-inversion-actividad-fuente-mapper.service';

describe('RegistroInversionActividadFuenteMapperService', () => {
  let service: RegistroInversionActividadFuenteMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroInversionActividadFuenteMapperService],
    }).compile();

    service = module.get<RegistroInversionActividadFuenteMapperService>(RegistroInversionActividadFuenteMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
