import { Test, TestingModule } from '@nestjs/testing';
import { ActividadMapperService } from './actividad-mapper.service';

describe('ActividadMapperService', () => {
  let service: ActividadMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActividadMapperService],
    }).compile();

    service = module.get<ActividadMapperService>(ActividadMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
