import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoProcesoExternoPlanDTO } from '../../dto/movimientoProcesoExternoPlan.dto';
import { MovimientoProcesoExternoPlanEntity } from '../../entities/movimientoProcesoExternoPlan.entity';
import { MovimientoProcesoExternoPlanMapperService } from '../../mappers/movimiento-proceso-externo-plan-mapper/movimiento-proceso-externo-plan-mapper.service';

@Injectable()
export class MovimientoProcesoExternoPlanRepositoryService {
    constructor(
        @InjectRepository(MovimientoProcesoExternoPlanEntity, 'MovimientosConection')
        private movimientoProcesoExternoPlanRepository: Repository<MovimientoProcesoExternoPlanEntity>,
        private movimientoProcesoExternoMapper: MovimientoProcesoExternoPlanMapperService
    ) {}

    newMovimientoProcesoExternoPlan(
        movimientoProcesoExternoPlanDTO: MovimientoProcesoExternoPlanDTO,
    ): Promise<MovimientoProcesoExternoPlanEntity> {
        const newMovimientoProcesoExternoPlan = this.movimientoProcesoExternoMapper.dtoToEntity(
            movimientoProcesoExternoPlanDTO,
        );

        return this.movimientoProcesoExternoPlanRepository.save(newMovimientoProcesoExternoPlan);
    }
}
