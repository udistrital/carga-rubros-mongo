import { Test, TestingModule } from '@nestjs/testing';
import { ModalidadSeleccionMapperService } from './modalidad-seleccion-mapper.service';

describe('ModalidadSeleccionMapperService', () => {
  let service: ModalidadSeleccionMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalidadSeleccionMapperService],
    }).compile();

    service = module.get<ModalidadSeleccionMapperService>(ModalidadSeleccionMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
