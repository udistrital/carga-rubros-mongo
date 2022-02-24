import { Injectable } from '@nestjs/common';
import { MetaDTO } from '../../dto/meta.dto';
import { MetaEntity } from '../../entities/meta.entity';

@Injectable()
export class MetaMapperService {
    dtoToEntity(metaDTO: MetaDTO): MetaEntity {
        return new MetaEntity(
            metaDTO.id,
            metaDTO.numero,
            metaDTO.nombre,
            metaDTO.fecha_creacion,
            metaDTO.fecha_modificacion,
            metaDTO.activo,
            metaDTO.rubro,
            metaDTO.lineamiento_id
        );
    }

    entityToDTO(metaEntity: MetaEntity): MetaDTO {
        return new MetaDTO(
            metaEntity.id,
            metaEntity.numero,
            metaEntity.nombre,
            metaEntity.fecha_creacion,
            metaEntity.fecha_modificacion,
            metaEntity.activo,
            metaEntity.rubro,
            metaEntity.lineamiento_id,
        );
    }
}
