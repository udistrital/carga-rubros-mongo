import { Test, TestingModule } from '@nestjs/testing';
import { ActividadRepositoryService } from './actividad-repository.service';

describe('ActividadRepositoryService', () => {
  let service: ActividadRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActividadRepositoryService],
    }).compile();

    service = module.get<ActividadRepositoryService>(ActividadRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
