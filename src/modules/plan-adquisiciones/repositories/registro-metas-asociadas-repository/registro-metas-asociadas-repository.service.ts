import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroMetasAsociadasDTO } from '../../dto/registroMetasAsociadas.dto';
import { RegistroMetasAsociadasEntity } from '../../entities/registroMetasAsociadas.entity';
import { RegistroMetasAsociadasMapperService } from '../../mappers/registro-metas-asociadas-mapper/registro-metas-asociadas-mapper.service';

@Injectable()
export class RegistroMetasAsociadasRepositoryService {
  constructor(
    @InjectRepository(RegistroMetasAsociadasEntity, 'PlanAdquisicionesConection')
    private registroMetasAsociadasRepository: Repository<
      RegistroMetasAsociadasEntity
    >,
    private registroMetasAsociadasMapper: RegistroMetasAsociadasMapperService,
  ) {}

  newRegistroMetasAsociadas(
    registroMetasAsociadasDTO: RegistroMetasAsociadasDTO,
  ): Promise<RegistroMetasAsociadasEntity> {
    const newRegistroMetasAsociadas = this.registroMetasAsociadasMapper.dtoToEntity(
      registroMetasAsociadasDTO,
    );
    return this.registroMetasAsociadasRepository.save(
      newRegistroMetasAsociadas,
    );
  }
}
