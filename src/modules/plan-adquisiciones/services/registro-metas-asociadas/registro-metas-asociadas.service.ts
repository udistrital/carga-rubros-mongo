import { Injectable } from '@nestjs/common';
import { RegistroMetasAsociadasDTO } from '../../dto/registroMetasAsociadas.dto';
import { RegistroMetasAsociadasEntity } from '../../entities/registroMetasAsociadas.entity';
import { RegistroMetasAsociadasMapperService } from '../../mappers/registro-metas-asociadas-mapper/registro-metas-asociadas-mapper.service';
import { RegistroMetasAsociadasRepositoryService } from '../../repositories/registro-metas-asociadas-repository/registro-metas-asociadas-repository.service';

@Injectable()
export class RegistroMetasAsociadasService {
  constructor(
    private registroMetasAsociadasRepository: RegistroMetasAsociadasRepositoryService,
    private registroMetasAsociadasMapper: RegistroMetasAsociadasMapperService,
  ) {}

  async newRegistroMetasAsociadas(
    registroMetasAsociadasDTO: RegistroMetasAsociadasDTO,
  ): Promise<RegistroMetasAsociadasDTO> {
    const newRegistroMetasAsociadas: RegistroMetasAsociadasEntity = await this.registroMetasAsociadasRepository.newRegistroMetasAsociadas(
      registroMetasAsociadasDTO,
    );
    return this.registroMetasAsociadasMapper.entityToDTO(
      newRegistroMetasAsociadas,
    );
  }
}
