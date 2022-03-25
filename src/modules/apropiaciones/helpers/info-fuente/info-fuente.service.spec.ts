import { Test, TestingModule } from '@nestjs/testing';
import { InfoFuenteHelperService } from './info-fuente.service';

describe('InfoFuenteService', () => {
  let service: InfoFuenteHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoFuenteHelperService],
    }).compile();

    service = module.get<InfoFuenteHelperService>(InfoFuenteHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
