import { Test, TestingModule } from '@nestjs/testing';
import { CodigoArkaService } from './codigo-arka.service';

describe('CodigoArkaService', () => {
  let service: CodigoArkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoArkaService],
    }).compile();

    service = module.get<CodigoArkaService>(CodigoArkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
