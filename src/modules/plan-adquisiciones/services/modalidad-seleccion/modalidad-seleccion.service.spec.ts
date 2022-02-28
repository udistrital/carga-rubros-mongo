import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadSeleccionService } from './modalidad-seleccion.service';

describe('ModalidadSeleccionService', () => {
  let service: ModalidadSeleccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadSeleccionService],
    }).compile();

    service = module.get<ModalidadSeleccionService>(ModalidadSeleccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
