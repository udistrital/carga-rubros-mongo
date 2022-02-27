import { Test, TestingModule } from '@nestjs/testing';
import { InfoProductoHelperService } from './info-producto.service';

describe('InfoProductoHelperService', () => {
  let service: InfoProductoHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoProductoHelperService],
    }).compile();

    service = module.get<InfoProductoHelperService>(InfoProductoHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
