import { Injectable } from '@nestjs/common';
import { RegistroProductosAsociadosDTO } from '../../dto/registroProductosAsociados.dto';
import { RegistroProductosAsociadosEntity } from '../../entities/registroProductosAsociados.entity';
import { RegistroProductosAsociadosMapperService } from '../../mappers/registro-productos-asociados-mapper/registro-productos-asociados-mapper.service';
import { RegistroProductosAsociadosRepositoryService } from '../../repositories/registro-productos-asociados-repository/registro-productos-asociados-repository.service';

@Injectable()
export class RegistroProductosAsociadosService {
  constructor(
    private registroProductosAsociadosRepository: RegistroProductosAsociadosRepositoryService,
    private registroProductosAsociadosMapper: RegistroProductosAsociadosMapperService,
  ) {}

  async newRegistroProductosAsociados(
    regitroProductosAsociadosDTO: RegistroProductosAsociadosDTO,
  ): Promise<RegistroProductosAsociadosDTO> {
    const newRegistroProductosAsociados: RegistroProductosAsociadosEntity = await this.registroProductosAsociadosRepository.newRegistroProductosAsociados(
      regitroProductosAsociadosDTO,
    );
    return this.registroProductosAsociadosMapper.entityToDTO(
      newRegistroProductosAsociados,
    );
  }
}
