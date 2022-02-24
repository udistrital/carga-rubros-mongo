import { Injectable } from '@nestjs/common';
import { PlanAdquisicionesDTO } from '../../dto/planAdquisiciones.dto';
import { PlanAdquisicionesEntity } from '../../entities/planAdquisiciones.entity';

@Injectable()
export class PlanAdquisicionesMapperService {
  dtoToEntity(
    planAdquisicionesDTO: PlanAdquisicionesDTO,
  ): PlanAdquisicionesEntity {
    return new PlanAdquisicionesEntity(
      planAdquisicionesDTO.id,
      planAdquisicionesDTO.descripcion,
      planAdquisicionesDTO.vigencia,
      planAdquisicionesDTO.fecha_creacion,
      planAdquisicionesDTO.fecha_modificacion,
      planAdquisicionesDTO.activo,
      planAdquisicionesDTO.publicado,
    );
  }

  entityToDTO(
    planAdquisicionesEntity: PlanAdquisicionesEntity,
  ): PlanAdquisicionesDTO {
    return new PlanAdquisicionesDTO(
      planAdquisicionesEntity.id,
      planAdquisicionesEntity.descripcion,
      planAdquisicionesEntity.vigencia,
      planAdquisicionesEntity.fecha_creacion,
      planAdquisicionesEntity.fecha_modificacion,
      planAdquisicionesEntity.activo,
      planAdquisicionesEntity.publicado,
    );
  }
}
