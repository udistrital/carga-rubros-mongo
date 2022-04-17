import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroPlanAdquisicionesDTO } from '../../dto/registroPlanAdquisiciones.dto';
import { RegistroPlanAdquisicionesEntity } from '../../entities/registroPlanAdquisiciones.entity';
import { RegistroPlanAdquisicionesMapperService } from '../../mappers/registro-plan-adquisiciones-mapper/registro-plan-adquisiciones-mapper.service';

@Injectable()
export class RegistroPlanAdquisicionesRepositoryService {
  constructor(
    @InjectRepository(RegistroPlanAdquisicionesEntity, 'PlanAdquisicionesConection')
    private registroPlanAdquisicionesRepository: Repository<
      RegistroPlanAdquisicionesEntity
    >,
    private registroPlanAdquisicionesMapper: RegistroPlanAdquisicionesMapperService,
  ) {}

  newRegistroPlanAdquisiciones(
    registroPlanAdquisicionesDTO: RegistroPlanAdquisicionesDTO,
  ): Promise<RegistroPlanAdquisicionesEntity> {
    const newRegistroPlanAdquisiciones = this.registroPlanAdquisicionesMapper.dtoToEntity(
      registroPlanAdquisicionesDTO,
    );
    return this.registroPlanAdquisicionesRepository.save(
      newRegistroPlanAdquisiciones,
    );
  }
}
