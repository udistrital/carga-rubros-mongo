import { Injectable } from '@nestjs/common';
import { ActividadDTO } from '../../dto/actividad.dto';
import { ActividadEntity } from '../../entities/actividad.entity';
import { ActividadMapperService } from '../../mappers/actividad-mapper/actividad-mapper.service';
import { ActividadRepositoryService } from '../../repositories/actividad-repository/actividad-repository.service';

@Injectable()
export class ActividadService {
    constructor(
        private actividadRepository: ActividadRepositoryService,
        private actividadMapper: ActividadMapperService,
      ) {}

      async newActividad(actividadDTO: ActividadDTO): Promise<ActividadDTO> {
        const newActividad: ActividadEntity = await this.actividadRepository.newActividad(actividadDTO);
        return this.actividadMapper.entityToDTO(newActividad);
      }
}
