import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroInversionActividadFuenteDTO } from '../../dto/registroInversionActividadFuente.dto';
import { RegistroInversionActividadFuenteEntity } from '../../entities/registroInversionActividadFuente.entity';
import { RegistroInversionActividadFuenteMapperService } from '../../mappers/registro-inversion-actividad-fuente-mapper/registro-inversion-actividad-fuente-mapper.service';

@Injectable()
export class RegistroInversionActividadFuenteRepositoryService {
  constructor(
    @InjectRepository(RegistroInversionActividadFuenteEntity)
    private registroInversionActividadFuenteRepository: Repository<
      RegistroInversionActividadFuenteEntity
    >,
    private registroInversionActividadFuenteMapper: RegistroInversionActividadFuenteMapperService,
  ) {}

  newRegistroInversionActividadFuente(
    registroInversionActividadFuenteDTO: RegistroInversionActividadFuenteDTO,
  ): Promise<RegistroInversionActividadFuenteEntity> {
    const newRegistroInversionActividadFuente = this.registroInversionActividadFuenteMapper.dtoToEntity(
      registroInversionActividadFuenteDTO,
    );

    return this.registroInversionActividadFuenteRepository.save(
      newRegistroInversionActividadFuente,
    );
  }
}
