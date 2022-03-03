import { Test, TestingModule } from '@nestjs/testing';
import { RegistroMetasAsociadasRepositoryService } from './registro-metas-asociadas-repository.service';

describe('RegistroMetasAsociadasRepositoryService', () => {
  let service: RegistroMetasAsociadasRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroMetasAsociadasRepositoryService],
    }).compile();

    service = module.get<RegistroMetasAsociadasRepositoryService>(RegistroMetasAsociadasRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
