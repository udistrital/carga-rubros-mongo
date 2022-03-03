import { Injectable } from '@nestjs/common';
import { RegistroInversionActividadFuenteDTO } from '../../dto/registroInversionActividadFuente.dto';
import { RegistroInversionActividadFuenteEntity } from '../../entities/registroInversionActividadFuente.entity';

@Injectable()
export class RegistroInversionActividadFuenteMapperService {
  dtoToEntity(
    registroInversionActividadFuenteDTO: RegistroInversionActividadFuenteDTO,
  ): RegistroInversionActividadFuenteEntity {
    return new RegistroInversionActividadFuenteEntity(
      registroInversionActividadFuenteDTO.id,
      registroInversionActividadFuenteDTO.fuente_financiamiento_id,
      registroInversionActividadFuenteDTO.valor_asignado,
      registroInversionActividadFuenteDTO.fecha_modificacion,
      registroInversionActividadFuenteDTO.activo,
      registroInversionActividadFuenteDTO.fecha_creacion,
      registroInversionActividadFuenteDTO.registro_plan_adquisiciones_actividad_id,
    );
  }

  entityToDTO(
    registroInversionActividadFuenteEntity: RegistroInversionActividadFuenteEntity,
  ): RegistroInversionActividadFuenteDTO {
    return new RegistroInversionActividadFuenteDTO(
      registroInversionActividadFuenteEntity.id,
      registroInversionActividadFuenteEntity.fuente_financiamiento_id,
      registroInversionActividadFuenteEntity.valor_asignado,
      registroInversionActividadFuenteEntity.fecha_modificacion,
      registroInversionActividadFuenteEntity.activo,
      registroInversionActividadFuenteEntity.fecha_creacion,
      registroInversionActividadFuenteEntity.registro_plan_adquisiciones_actividad_id,
    );
  }
}
