import { Injectable } from '@nestjs/common';
import { PlanAdquisicionesDTO } from '../../dto/planAdquisiciones.dto';
import { PlanAdquisicionesEntity } from '../../entities/planAdquisiciones.entity';
import { PlanAdquisicionesMapperService } from '../../mappers/plan-adquisiciones-mapper/plan-adquisiciones-mapper.service';
import { PlanAdquisicionesRepositoryService } from '../../repositories/plan-adquisiciones-repository/plan-adquisiciones-repository.service';

@Injectable()
export class PlanAdquisicionesService {
  constructor(
    private planAdquisicionesRepository: PlanAdquisicionesRepositoryService,
    private planAdquisicionesMapper: PlanAdquisicionesMapperService,
  ) {}

  async newPlanAdquisiciones(
    planAdquisicionesDTO: PlanAdquisicionesDTO,
  ): Promise<PlanAdquisicionesDTO> {
    const newPlanAdquisiciones: PlanAdquisicionesEntity = await this.planAdquisicionesRepository.newPlanAdquisiciones(
      planAdquisicionesDTO,
    );
    return this.planAdquisicionesMapper.entityToDTO(newPlanAdquisiciones);
  }
}
