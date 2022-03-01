import { Injectable } from '@nestjs/common';
import { CodigoArkaDTO } from '../../dto/codigoArka.dto';
import { CodigoArkaEntity } from '../../entities/codigoArka.entity';
import { CodigoArkaMapperService } from '../../mappers/codigo-arka-mapper/codigo-arka-mapper.service';
import { CodigoArkaRepositoryService } from '../../repositories/codigo-arka-repository/codigo-arka-repository.service';

@Injectable()
export class CodigoArkaService {
  constructor(
    private codigoArkaRepository: CodigoArkaRepositoryService,
    private codigoArkaMapper: CodigoArkaMapperService,
  ) {}

  async newCodigoArka(codigoArkaDTO: CodigoArkaDTO): Promise<CodigoArkaDTO> {
    const newCodigoArka: CodigoArkaEntity = await this.codigoArkaRepository.newCodigoArka(
      codigoArkaDTO,
    );
    return this.codigoArkaMapper.entityToDTO(newCodigoArka);
  }
}
