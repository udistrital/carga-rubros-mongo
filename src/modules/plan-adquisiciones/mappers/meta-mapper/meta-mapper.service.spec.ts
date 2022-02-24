import { Test, TestingModule } from '@nestjs/testing';
import { MetaMapperService } from './meta-mapper.service';

describe('MetaMapperService', () => {
  let service: MetaMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaMapperService],
    }).compile();

    service = module.get<MetaMapperService>(MetaMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
