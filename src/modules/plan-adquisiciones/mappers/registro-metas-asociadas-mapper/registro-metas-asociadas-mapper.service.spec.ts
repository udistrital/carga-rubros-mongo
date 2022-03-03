import { Test, TestingModule } from '@nestjs/testing';
import { RegistroMetasAsociadasMapperService } from './registro-metas-asociadas-mapper.service';

describe('RegistroMetasAsociadasMapperService', () => {
  let service: RegistroMetasAsociadasMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroMetasAsociadasMapperService],
    }).compile();

    service = module.get<RegistroMetasAsociadasMapperService>(RegistroMetasAsociadasMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
