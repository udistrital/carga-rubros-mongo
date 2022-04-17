import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanAdquisicionesActividadDTO } from '../../dto/planAdquisicionesActividad.dto';
import { PlanAdquisicionesActividadEntity } from '../../entities/planAdquisicionesActividad.entity';
import { PlanAdquisicionesActividadMapperService } from '../../mappers/plan-adquisiciones-actividad-mapper/plan-adquisiciones-actividad-mapper.service';

@Injectable()
export class PlanAdquisicionesActividadRepositoryService {
  constructor(
    @InjectRepository(PlanAdquisicionesActividadEntity, 'PlanAdquisicionesConection')
    private planAdquisicionesActividadRepository: Repository<
      PlanAdquisicionesActividadEntity
    >,
    private planAdquisicionesActividadMapper: PlanAdquisicionesActividadMapperService,
  ) {}

  newPlanAdquisicionesActividad(
    planAdquisicionesActividadDTO: PlanAdquisicionesActividadDTO,
  ): Promise<PlanAdquisicionesActividadEntity> {
    const newPlanAdquisicionesActividad = this.planAdquisicionesActividadMapper.dtoToEntity(
      planAdquisicionesActividadDTO,
    );
    return this.planAdquisicionesActividadRepository.save(
      newPlanAdquisicionesActividad,
    );
  }
}
