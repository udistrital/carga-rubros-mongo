import { Test, TestingModule } from '@nestjs/testing';
import { CodigoArkaRepositoryService } from './codigo-arka-repository.service';

describe('CodigoArkaRepositoryService', () => {
  let service: CodigoArkaRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoArkaRepositoryService],
    }).compile();

    service = module.get<CodigoArkaRepositoryService>(CodigoArkaRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
