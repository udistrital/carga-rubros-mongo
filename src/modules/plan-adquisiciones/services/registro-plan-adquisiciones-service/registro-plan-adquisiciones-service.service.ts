import { Injectable } from '@nestjs/common';
import { RegistroPlanAdquisicionesDTO } from '../../dto/registroPlanAdquisiciones.dto';
import { RegistroPlanAdquisicionesEntity } from '../../entities/registroPlanAdquisiciones.entity';
import { RegistroPlanAdquisicionesMapperService } from '../../mappers/registro-plan-adquisiciones-mapper/registro-plan-adquisiciones-mapper.service';
import { RegistroPlanAdquisicionesRepositoryService } from '../../repositories/registro-plan-adquisiciones-repository/registro-plan-adquisiciones-repository.service';

@Injectable()
export class RegistroPlanAdquisicionesService {
  constructor(
    private registroPlanAdquisicionesRepository: RegistroPlanAdquisicionesRepositoryService,
    private registroPlanAdquisicionesMapper: RegistroPlanAdquisicionesMapperService,
  ) {}

  async newRegistroPlanAdquisiciones(
    registroPlanAdquisicionesDTO: RegistroPlanAdquisicionesDTO,
  ): Promise<RegistroPlanAdquisicionesDTO> {
    const newRegistroPlanAdquisiciones: RegistroPlanAdquisicionesEntity = await this.registroPlanAdquisicionesRepository.newRegistroPlanAdquisiciones(
      registroPlanAdquisicionesDTO,
    );
    return this.registroPlanAdquisicionesMapper.entityToDTO(
      newRegistroPlanAdquisiciones,
    );
  }
}
