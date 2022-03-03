import { Test, TestingModule } from '@nestjs/testing';
import { RegistroProductosAsociadosRepositoryService } from './registro-productos-asociados-repository.service';

describe('RegistroProductosAsociadosRepositoryService', () => {
  let service: RegistroProductosAsociadosRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroProductosAsociadosRepositoryService],
    }).compile();

    service = module.get<RegistroProductosAsociadosRepositoryService>(RegistroProductosAsociadosRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
