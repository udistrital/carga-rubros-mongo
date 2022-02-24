import { Injectable } from '@nestjs/common';
import { MetaDTO } from '../../dto/meta.dto';
import { MetaEntity } from '../../entities/meta.entity';
import { MetaMapperService } from '../../mappers/meta-mapper/meta-mapper.service';
import { MetaRepositoryService } from '../../repositories/meta-repositorie/meta-repository.service';

@Injectable()
export class MetaService {
  constructor(
    private metaRepository: MetaRepositoryService,
    private metaMapper: MetaMapperService,
  ) {}

  async newMeta(metaDTO: MetaDTO): Promise<MetaDTO> {
    const newMeta: MetaEntity = await this.metaRepository.newMeta(metaDTO);
    return this.metaMapper.entityToDTO(newMeta);
  }
}
