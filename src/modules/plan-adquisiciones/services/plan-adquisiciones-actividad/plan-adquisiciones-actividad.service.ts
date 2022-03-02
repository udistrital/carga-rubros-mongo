import { Injectable } from '@nestjs/common';
import { PlanAdquisicionesActividadDTO } from '../../dto/planAdquisicionesActividad.dto';
import { PlanAdquisicionesActividadEntity } from '../../entities/planAdquisicionesActividad.entity';
import { PlanAdquisicionesActividadMapperService } from '../../mappers/plan-adquisiciones-actividad-mapper/plan-adquisiciones-actividad-mapper.service';
import { PlanAdquisicionesActividadRepositoryService } from '../../repositories/plan-adquisiciones-actividad-repository/plan-adquisiciones-actividad-repository.service';

@Injectable()
export class PlanAdquisicionesActividadService {
  constructor(
    private planAdquisicionesActividadRepository: PlanAdquisicionesActividadRepositoryService,
    private planAdquisicionesActividadMapper: PlanAdquisicionesActividadMapperService,
  ) {}

  async newPlanAdquisicionesActividad(
    planAdquisicionesActividadDTO: PlanAdquisicionesActividadDTO,
  ): Promise<PlanAdquisicionesActividadDTO> {
    const newPlanAdquisicionesActividad: PlanAdquisicionesActividadEntity = await this.planAdquisicionesActividadRepository.newPlanAdquisicionesActividad(
      planAdquisicionesActividadDTO,
    );
    return this.planAdquisicionesActividadMapper.entityToDTO(
      newPlanAdquisicionesActividad,
    );
  }
}
