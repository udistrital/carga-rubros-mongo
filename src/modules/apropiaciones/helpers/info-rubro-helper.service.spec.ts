import { Test, TestingModule } from '@nestjs/testing';
import { InfoRubroHelperService } from './info-rubro-helper.service';

describe('InfoRubroHelperService', () => {
  let service: InfoRubroHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoRubroHelperService],
    }).compile();

    service = module.get<InfoRubroHelperService>(InfoRubroHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
