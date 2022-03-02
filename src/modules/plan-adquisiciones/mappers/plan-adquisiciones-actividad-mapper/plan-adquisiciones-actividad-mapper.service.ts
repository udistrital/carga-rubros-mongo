import { Injectable } from '@nestjs/common';
import { PlanAdquisicionesActividadDTO } from '../../dto/planAdquisicionesActividad.dto';
import { PlanAdquisicionesActividadEntity } from '../../entities/planAdquisicionesActividad.entity';

@Injectable()
export class PlanAdquisicionesActividadMapperService {
    dtoToEntity(planAdquisicionesActividadDTO: PlanAdquisicionesActividadDTO): PlanAdquisicionesActividadEntity {
        return new PlanAdquisicionesActividadEntity (
            planAdquisicionesActividadDTO.id,
            planAdquisicionesActividadDTO.valor,
            planAdquisicionesActividadDTO.fecha_creacion,
            planAdquisicionesActividadDTO.fecha_modificacion,
            planAdquisicionesActividadDTO.activo,
            planAdquisicionesActividadDTO.actividad_id,
            planAdquisicionesActividadDTO.registro_plan_adquisiciones_id
        )
    }

    entityToDTO(planAdquisicionesActividadEntity: PlanAdquisicionesActividadEntity): PlanAdquisicionesActividadDTO {
        return new PlanAdquisicionesActividadDTO (
            planAdquisicionesActividadEntity.id,
            planAdquisicionesActividadEntity.valor,
            planAdquisicionesActividadEntity.fecha_creacion,
            planAdquisicionesActividadEntity.fecha_modificacion,
            planAdquisicionesActividadEntity.activo,
            planAdquisicionesActividadEntity.actividad_id,
            planAdquisicionesActividadEntity.registro_plan_adquisiciones_id
        )
    }
}
