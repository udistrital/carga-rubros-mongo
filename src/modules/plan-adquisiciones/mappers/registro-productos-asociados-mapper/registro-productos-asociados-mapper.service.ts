import { Injectable } from '@nestjs/common';
import { RegistroProductosAsociadosDTO } from '../../dto/registroProductosAsociados.dto';
import { RegistroProductosAsociadosEntity } from '../../entities/registroProductosAsociados.entity';

@Injectable()
export class RegistroProductosAsociadosMapperService {
  dtoToEntity(
    registroProductosAsociadosDTO: RegistroProductosAsociadosDTO,
  ): RegistroProductosAsociadosEntity {
    return new RegistroProductosAsociadosEntity(
      registroProductosAsociadosDTO.id,
      registroProductosAsociadosDTO.producto_asociado_id,
      registroProductosAsociadosDTO.fecha_modificacion,
      registroProductosAsociadosDTO.activo,
      registroProductosAsociadosDTO.fecha_creacion,
      registroProductosAsociadosDTO.registro_plan_adquisiciones_id,
      registroProductosAsociadosDTO.porcentaje_distribucion,
    );
  }

  entityToDTO(
    registroProductosAsociadosEntity: RegistroProductosAsociadosEntity,
  ): RegistroProductosAsociadosDTO {
    return new RegistroProductosAsociadosDTO(
      registroProductosAsociadosEntity.id,
      registroProductosAsociadosEntity.producto_asociado_id,
      registroProductosAsociadosEntity.fecha_modificacion,
      registroProductosAsociadosEntity.activo,
      registroProductosAsociadosEntity.fecha_creacion,
      registroProductosAsociadosEntity.registro_plan_adquisiciones_id,
      registroProductosAsociadosEntity.porcentaje_distribucion,
    );
  }
}
