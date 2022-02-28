import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadSeleccionRepositoryService } from './modalidad-seleccion-repository.service';

describe('ModalidadSeleccionRepositoryService', () => {
  let service: ModalidadSeleccionRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadSeleccionRepositoryService],
    }).compile();

    service = module.get<ModalidadSeleccionRepositoryService>(ModalidadSeleccionRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
