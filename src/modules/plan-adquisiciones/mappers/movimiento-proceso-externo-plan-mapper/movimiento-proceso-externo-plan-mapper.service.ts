import { Injectable } from '@nestjs/common';
import { MovimientoProcesoExternoPlanDTO } from '../../dto/movimientoProcesoExternoPlan.dto';
import { MovimientoProcesoExternoPlanEntity } from '../../entities/movimientoProcesoExternoPlan.entity';

@Injectable()
export class MovimientoProcesoExternoPlanMapperService {
    dtoToEntity(
        movimientoProcesoExternoPlanDTO: MovimientoProcesoExternoPlanDTO
    ): MovimientoProcesoExternoPlanEntity {
        return new MovimientoProcesoExternoPlanEntity(
            movimientoProcesoExternoPlanDTO.id,
            movimientoProcesoExternoPlanDTO.tipo_movimiento_id,
            movimientoProcesoExternoPlanDTO.proceso_externo,
            movimientoProcesoExternoPlanDTO.movimiento_proceso_externo,
            movimientoProcesoExternoPlanDTO.activo,
            movimientoProcesoExternoPlanDTO.fecha_creacion,
            movimientoProcesoExternoPlanDTO.fecha_modificacion,
            movimientoProcesoExternoPlanDTO.detalle
        );
    }

    entityToDTO(
        movimientoProcesoExternoPlanEntity: MovimientoProcesoExternoPlanEntity
    ): MovimientoProcesoExternoPlanDTO {
        return new MovimientoProcesoExternoPlanDTO(
            movimientoProcesoExternoPlanEntity.id,
            movimientoProcesoExternoPlanEntity.tipo_movimiento_id,
            movimientoProcesoExternoPlanEntity.proceso_externo,
            movimientoProcesoExternoPlanEntity.movimiento_proceso_externo,
            movimientoProcesoExternoPlanEntity.activo,
            movimientoProcesoExternoPlanEntity.fecha_creacion,
            movimientoProcesoExternoPlanEntity.fecha_modificacion,
            movimientoProcesoExternoPlanEntity.detalle
        );
    }
}
