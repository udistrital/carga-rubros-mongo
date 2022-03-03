import { Test, TestingModule } from '@nestjs/testing';
import { RegistroProductosAsociadosService } from './registro-productos-asociados.service';

describe('RegistroProductosAsociadosService', () => {
  let service: RegistroProductosAsociadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroProductosAsociadosService],
    }).compile();

    service = module.get<RegistroProductosAsociadosService>(RegistroProductosAsociadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
