import { Test, TestingModule } from '@nestjs/testing';
import { RegistroMetasAsociadasService } from './registro-metas-asociadas.service';

describe('RegistroMetasAsociadasService', () => {
  let service: RegistroMetasAsociadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroMetasAsociadasService],
    }).compile();

    service = module.get<RegistroMetasAsociadasService>(RegistroMetasAsociadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
