import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaDTO } from '../../dto/meta.dto';
import { MetaEntity } from '../../entities/meta.entity';
import { MetaMapperService } from '../../mappers/meta-mapper/meta-mapper.service';

@Injectable()
export class MetaRepositoryService {
  constructor(
    @InjectRepository(MetaEntity, 'PlanAdquisicionesConection')
    private metaRepository: Repository<MetaEntity>,
    private metaMapper: MetaMapperService,
  ) {}

  newMeta(metaDTO: MetaDTO): Promise<MetaEntity> {
    const newMeta = this.metaMapper.dtoToEntity(metaDTO);
    return this.metaRepository.save(newMeta);
  }

  getAllMetas(): Promise<MetaEntity[]> {
    return this.metaRepository.find();
  }
}
