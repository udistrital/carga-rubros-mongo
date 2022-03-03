import { Test, TestingModule } from '@nestjs/testing';
import { RegistroProductosAsociadosMapperService } from './registro-productos-asociados-mapper.service';

describe('RegistroProductosAsociadosMapperService', () => {
  let service: RegistroProductosAsociadosMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroProductosAsociadosMapperService],
    }).compile();

    service = module.get<RegistroProductosAsociadosMapperService>(RegistroProductosAsociadosMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
