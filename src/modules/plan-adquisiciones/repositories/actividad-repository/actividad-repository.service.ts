import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadDTO } from '../../dto/actividad.dto';
import { ActividadEntity } from '../../entities/actividad.entity';
import { ActividadMapperService } from '../../mappers/actividad-mapper/actividad-mapper.service';

@Injectable()
export class ActividadRepositoryService {
  constructor(
    @InjectRepository(ActividadEntity)
    private actividadRepository: Repository<ActividadEntity>,
    private actividadMapper: ActividadMapperService,
  ) {}

  newActividad(actividadDTO: ActividadDTO): Promise<ActividadEntity> {
    const newActividad = this.actividadMapper.dtoToEntity(actividadDTO);
    return this.actividadRepository.save(newActividad);
  }

  getAllActividades(): Promise<ActividadEntity[]> {
    return this.actividadRepository.find();
  }
}
