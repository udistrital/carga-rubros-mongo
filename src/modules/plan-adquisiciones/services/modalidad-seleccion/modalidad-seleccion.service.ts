import { Injectable } from '@nestjs/common';
import { ModalidadSeleccionDTO } from '../../dto/modalidadSeleccion.dto';
import { ModalidadSeleccionEntity } from '../../entities/modalidadSeleccion.entity';
import { ModalidadSeleccionMapperService } from '../../mappers/modalidad-seleccion-mapper/modalidad-seleccion-mapper.service';
import { ModalidadSeleccionRepositoryService } from '../../repositories/modalidad-seleccion-repository/modalidad-seleccion-repository.service';

@Injectable()
export class ModalidadSeleccionService {
  constructor(
    private modalidadSeleccionRepository: ModalidadSeleccionRepositoryService,
    private modalidadSeleccionMapper: ModalidadSeleccionMapperService,
  ) {}

  async newModalidadSeleccion(
    modalidadSeleccionDTO: ModalidadSeleccionDTO,
  ): Promise<ModalidadSeleccionDTO> {
    const newModalidadSeleccion: ModalidadSeleccionEntity = await this.modalidadSeleccionRepository.newModalidadSeleccion(
      modalidadSeleccionDTO,
    );
    return this.modalidadSeleccionMapper.entityToDTO(newModalidadSeleccion);
  }
}
