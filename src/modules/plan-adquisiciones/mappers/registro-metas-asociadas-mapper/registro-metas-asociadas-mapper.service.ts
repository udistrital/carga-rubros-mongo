import { Injectable } from '@nestjs/common';
import { RegistroMetasAsociadasDTO } from '../../dto/registroMetasAsociadas.dto';
import { RegistroMetasAsociadasEntity } from '../../entities/registroMetasAsociadas.entity';

@Injectable()
export class RegistroMetasAsociadasMapperService {
  dtoToEntity(
    registroMetasAsociadasDTO: RegistroMetasAsociadasDTO,
  ): RegistroMetasAsociadasEntity {
    return new RegistroMetasAsociadasEntity(
      registroMetasAsociadasDTO.id,
      registroMetasAsociadasDTO.fecha_modificacion,
      registroMetasAsociadasDTO.activo,
      registroMetasAsociadasDTO.fecha_creacion,
      registroMetasAsociadasDTO.registro_plan_adquisiciones_id,
      registroMetasAsociadasDTO.meta_id,
    );
  }

  entityToDTO(
    registroMetasAsociadasEntity: RegistroMetasAsociadasEntity,
  ): RegistroMetasAsociadasDTO {
    return new RegistroMetasAsociadasDTO(
      registroMetasAsociadasEntity.id,
      registroMetasAsociadasEntity.fecha_modificacion,
      registroMetasAsociadasEntity.activo,
      registroMetasAsociadasEntity.fecha_creacion,
      registroMetasAsociadasEntity.registro_plan_adquisiciones_id,
      registroMetasAsociadasEntity.meta_id,
    );
  }
}
