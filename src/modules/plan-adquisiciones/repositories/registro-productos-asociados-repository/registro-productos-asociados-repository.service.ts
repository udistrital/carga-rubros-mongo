import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroProductosAsociadosDTO } from '../../dto/registroProductosAsociados.dto';
import { RegistroProductosAsociadosEntity } from '../../entities/registroProductosAsociados.entity';
import { RegistroProductosAsociadosMapperService } from '../../mappers/registro-productos-asociados-mapper/registro-productos-asociados-mapper.service';

@Injectable()
export class RegistroProductosAsociadosRepositoryService {
  constructor(
    @InjectRepository(RegistroProductosAsociadosEntity)
    private registroProductosAsociadosRepository: Repository<
      RegistroProductosAsociadosEntity
    >,
    private registroProductosAsociadosMapper: RegistroProductosAsociadosMapperService,
  ) {}

  newRegistroProductosAsociados(
    registroProductosAsociadosDTO: RegistroProductosAsociadosDTO,
  ): Promise<RegistroProductosAsociadosEntity> {
    const newRegistroProductosAsociados = this.registroProductosAsociadosMapper.dtoToEntity(
      registroProductosAsociadosDTO,
    );
    return this.registroProductosAsociadosRepository.save(
      newRegistroProductosAsociados,
    );
  }
}
