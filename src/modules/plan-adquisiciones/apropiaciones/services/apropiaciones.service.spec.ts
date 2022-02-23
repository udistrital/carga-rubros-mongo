import { Test, TestingModule } from '@nestjs/testing';
import { ApropiacionesService } from './apropiaciones.service';

describe('ApropiacionesService', () => {
  let service: ApropiacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApropiacionesService],
    }).compile();

    service = module.get<ApropiacionesService>(ApropiacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
