import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanAdquisicionesDTO } from '../../dto/planAdquisiciones.dto';
import { PlanAdquisicionesEntity } from '../../entities/planAdquisiciones.entity';
import { PlanAdquisicionesMapperService } from '../../mappers/plan-adquisiciones-mapper/plan-adquisiciones-mapper.service';

@Injectable()
export class PlanAdquisicionesRepositoryService {
  constructor(
    @InjectRepository(PlanAdquisicionesEntity, 'PlanAdquisicionesConection')
    private planAdquisicionesRepository: Repository<PlanAdquisicionesEntity>,
    private planAdquisicionesMapper: PlanAdquisicionesMapperService,
  ) {}

  newPlanAdquisiciones(
    planAdquisicionesDTO: PlanAdquisicionesDTO,
  ): Promise<PlanAdquisicionesEntity> {
    const newPlanAdquisiciones = this.planAdquisicionesMapper.dtoToEntity(
      planAdquisicionesDTO,
    );
    return this.planAdquisicionesRepository.save(newPlanAdquisiciones);
  }
}
