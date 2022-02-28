import { Injectable } from '@nestjs/common';
import { ModalidadSeleccionDTO } from '../../dto/modalidadSeleccion.dto';
import { ModalidadSeleccionEntity } from '../../entities/modalidadSeleccion.entity';

@Injectable()
export class ModalidadSeleccionMapperService {
  dtoToEntity(
    modalidadSeleccionDTO: ModalidadSeleccionDTO,
  ): ModalidadSeleccionEntity {
    return new ModalidadSeleccionEntity(
      modalidadSeleccionDTO.id,
      modalidadSeleccionDTO.id_modalidad_seleccion,
      modalidadSeleccionDTO.fecha_modificacion,
      modalidadSeleccionDTO.activo,
      modalidadSeleccionDTO.fecha_creacion,
      modalidadSeleccionDTO.registro_plan_adquisiciones_id,
    );
  }

  entityToDTO(
    modalidadSeleccionEntity: ModalidadSeleccionEntity,
  ): ModalidadSeleccionDTO {
    return new ModalidadSeleccionDTO(
      modalidadSeleccionEntity.id,
      modalidadSeleccionEntity.id_modalidad_seleccion,
      modalidadSeleccionEntity.fecha_modificacion,
      modalidadSeleccionEntity.activo,
      modalidadSeleccionEntity.fecha_creacion,
      modalidadSeleccionEntity.registro_plan_adquisiciones_id,
    );
  }
}
