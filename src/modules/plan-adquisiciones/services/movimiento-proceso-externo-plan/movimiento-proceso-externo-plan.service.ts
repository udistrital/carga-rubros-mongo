import { Injectable } from '@nestjs/common';
import { MovimientoProcesoExternoPlanDTO } from '../../dto/movimientoProcesoExternoPlan.dto';
import { MovimientoProcesoExternoPlanEntity } from '../../entities/movimientoProcesoExternoPlan.entity';
import { MovimientoProcesoExternoPlanMapperService } from '../../mappers/movimiento-proceso-externo-plan-mapper/movimiento-proceso-externo-plan-mapper.service';
import { MovimientoProcesoExternoPlanRepositoryService } from '../../repositories/movimiento-proceso-externo-plan-repository/movimiento-proceso-externo-plan-repository.service';

@Injectable()
export class MovimientoProcesoExternoPlanService {
  constructor(
    private movimientoProcesoExternoPlanRepository: MovimientoProcesoExternoPlanRepositoryService,
    private movimientoProcesoExternoPlanMapper: MovimientoProcesoExternoPlanMapperService,
  ) {}

  async newMovimientoProcesoExternoPlan(
    movimientoProcesoExternoPlanDTO: MovimientoProcesoExternoPlanDTO,
  ): Promise<MovimientoProcesoExternoPlanDTO> {
    const newMovimientoProcesoExternoPlan: MovimientoProcesoExternoPlanEntity = await this.movimientoProcesoExternoPlanRepository.newMovimientoProcesoExternoPlan(
      movimientoProcesoExternoPlanDTO,
    );
    return this.movimientoProcesoExternoPlanMapper.entityToDTO(
      newMovimientoProcesoExternoPlan,
    );
  }
}
