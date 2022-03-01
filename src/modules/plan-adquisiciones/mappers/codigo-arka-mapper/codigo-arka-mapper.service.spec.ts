import { Test, TestingModule } from '@nestjs/testing';
import { CodigoArkaMapperService } from './codigo-arka-mapper.service';

describe('CodigoArkaMapperService', () => {
  let service: CodigoArkaMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoArkaMapperService],
    }).compile();

    service = module.get<CodigoArkaMapperService>(CodigoArkaMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
