import { Injectable } from '@nestjs/common';
import { CodigoArkaDTO } from '../../dto/codigoArka.dto';
import { CodigoArkaEntity } from '../../entities/codigoArka.entity';

@Injectable()
export class CodigoArkaMapperService {
    dtoToEntity(codigoArkaDTO: CodigoArkaDTO): CodigoArkaEntity {
        return new CodigoArkaEntity(
            codigoArkaDTO.id,
            codigoArkaDTO.codigo_arka,
            codigoArkaDTO.fecha_modificacion,
            codigoArkaDTO.activo,
            codigoArkaDTO.fecha_creacion,
            codigoArkaDTO.registro_plan_adquisiciones_id
        );
    }

    entityToDTO(codigoArkaEntity: CodigoArkaEntity): CodigoArkaDTO {
        return new CodigoArkaDTO (
            codigoArkaEntity.id,
            codigoArkaEntity.codigo_arka,
            codigoArkaEntity.fecha_modificacion,
            codigoArkaEntity.activo,
            codigoArkaEntity.fecha_creacion,
            codigoArkaEntity.registro_plan_adquisiciones_id
        );
    }
}
