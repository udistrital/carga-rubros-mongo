import { Test, TestingModule } from '@nestjs/testing';
import { MetaRepositoryService } from './meta-repository.service';

describe('MetaRepositorieService', () => {
  let service: MetaRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaRepositoryService],
    }).compile();

    service = module.get<MetaRepositoryService>(MetaRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
