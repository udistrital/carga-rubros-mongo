import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodigoArkaDTO } from '../../dto/codigoArka.dto';
import { CodigoArkaEntity } from '../../entities/codigoArka.entity';
import { CodigoArkaMapperService } from '../../mappers/codigo-arka-mapper/codigo-arka-mapper.service';

@Injectable()
export class CodigoArkaRepositoryService {
  constructor(
    @InjectRepository(CodigoArkaEntity)
    private codigoArkaRepository: Repository<CodigoArkaEntity>,
    private codigoArkaMapper: CodigoArkaMapperService,
  ) {}

  newCodigoArka(codigoArkaDTO: CodigoArkaDTO): Promise<CodigoArkaEntity> {
    const newCodigoArka = this.codigoArkaMapper.dtoToEntity(codigoArkaDTO);
    return this.codigoArkaRepository.save(newCodigoArka);
  }
}
