import { Injectable } from '@nestjs/common';
import { ActividadDTO } from '../../dto/actividad.dto';
import { ActividadEntity } from '../../entities/actividad.entity';

@Injectable()
export class ActividadMapperService {
  dtoToEntity(actividadDTO: ActividadDTO): ActividadEntity {
    return new ActividadEntity(
      actividadDTO.id,
      actividadDTO.numero,
      actividadDTO.nombre,
      actividadDTO.fecha_creacion,
      actividadDTO.fecha_modificacion,
      actividadDTO.activo,
      actividadDTO.meta_id,
    );
  }

  entityToDTO(actividadEntity: ActividadEntity): ActividadDTO {
    return new ActividadDTO(
      actividadEntity.id,
      actividadEntity.numero,
      actividadEntity.nombre,
      actividadEntity.fecha_creacion,
      actividadEntity.fecha_modificacion,
      actividadEntity.activo,
      actividadEntity.meta_id,
    );
  }
}
