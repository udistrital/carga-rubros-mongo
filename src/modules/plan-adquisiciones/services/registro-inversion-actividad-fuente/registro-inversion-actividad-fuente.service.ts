import { Injectable } from '@nestjs/common';
import { RegistroInversionActividadFuenteDTO } from '../../dto/registroInversionActividadFuente.dto';
import { RegistroInversionActividadFuenteEntity } from '../../entities/registroInversionActividadFuente.entity';
import { RegistroInversionActividadFuenteMapperService } from '../../mappers/registro-inversion-actividad-fuente-mapper/registro-inversion-actividad-fuente-mapper.service';
import { RegistroInversionActividadFuenteRepositoryService } from '../../repositories/registro-inversion-actividad-fuente-repository/registro-inversion-actividad-fuente-repository.service';

@Injectable()
export class RegistroInversionActividadFuenteService {
  constructor(
    private registroInversionActividadFuenteRepository: RegistroInversionActividadFuenteRepositoryService,
    private registroInversionActividadFuenteMapper: RegistroInversionActividadFuenteMapperService,
  ) {}

  async newRegistroInversionActividadFuente(
    registroInversionActividadFuenteDTO: RegistroInversionActividadFuenteDTO,
  ): Promise<RegistroInversionActividadFuenteDTO> {
    const newRegistroPlanInversionActividadFuente: RegistroInversionActividadFuenteEntity = await this.registroInversionActividadFuenteRepository.newRegistroInversionActividadFuente(
      registroInversionActividadFuenteDTO,
    );
    return this.registroInversionActividadFuenteMapper.entityToDTO(
      newRegistroPlanInversionActividadFuente,
    );
  }
}
