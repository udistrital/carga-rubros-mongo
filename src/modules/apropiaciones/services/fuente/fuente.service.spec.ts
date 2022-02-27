import { Test, TestingModule } from '@nestjs/testing';
import { FuenteService } from './fuente.service';

describe('FuenteService', () => {
  let service: FuenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuenteService],
    }).compile();

    service = module.get<FuenteService>(FuenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
