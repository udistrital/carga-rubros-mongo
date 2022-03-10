import { Injectable } from '@nestjs/common';
import { RegistroPlanAdquisicionesDTO } from '../../dto/registroPlanAdquisiciones.dto';
import { RegistroPlanAdquisicionesEntity } from '../../entities/registroPlanAdquisiciones.entity';

@Injectable()
export class RegistroPlanAdquisicionesMapperService {
  dtoToEntity(
    registroPlanAdquisicionesDTO: RegistroPlanAdquisicionesDTO,
  ): RegistroPlanAdquisicionesEntity {
    return new RegistroPlanAdquisicionesEntity(
      registroPlanAdquisicionesDTO.id,
      registroPlanAdquisicionesDTO.area_funcional,
      registroPlanAdquisicionesDTO.centro_gestor,
      registroPlanAdquisicionesDTO.fecha_creacion,
      registroPlanAdquisicionesDTO.fecha_modificacion,
      registroPlanAdquisicionesDTO.responsable_id,
      registroPlanAdquisicionesDTO.activo,
      registroPlanAdquisicionesDTO.meta_id,
      registroPlanAdquisicionesDTO.producto_id,
      registroPlanAdquisicionesDTO.plan_adquisiciones_id,
      registroPlanAdquisicionesDTO.rubro_id,
      registroPlanAdquisicionesDTO.fecha_estimada_inicio,
      registroPlanAdquisicionesDTO.fecha_estimada_fin,
      registroPlanAdquisicionesDTO.fuente_financiamiento_id,
      registroPlanAdquisicionesDTO.actividad_id,
      registroPlanAdquisicionesDTO.valor_actividad,
    );
  }

  entityToDTO(
    registroPlanAdquisicionesEntity: RegistroPlanAdquisicionesEntity,
  ): RegistroPlanAdquisicionesDTO {
    return new RegistroPlanAdquisicionesDTO(
      registroPlanAdquisicionesEntity.id,
      registroPlanAdquisicionesEntity.area_funcional,
      registroPlanAdquisicionesEntity.centro_gestor,
      registroPlanAdquisicionesEntity.fecha_creacion,
      registroPlanAdquisicionesEntity.fecha_modificacion,
      registroPlanAdquisicionesEntity.responsable_id,
      registroPlanAdquisicionesEntity.activo,
      registroPlanAdquisicionesEntity.meta_id,
      registroPlanAdquisicionesEntity.producto_id,
      registroPlanAdquisicionesEntity.plan_adquisiciones_id,
      registroPlanAdquisicionesEntity.rubro_id,
      registroPlanAdquisicionesEntity.fecha_estimada_inicio,
      registroPlanAdquisicionesEntity.fecha_estimada_fin,
      registroPlanAdquisicionesEntity.fuente_financiamiento_id,
      registroPlanAdquisicionesEntity.actividad_id,
      registroPlanAdquisicionesEntity.valor_actividad,
    );
  }
}
