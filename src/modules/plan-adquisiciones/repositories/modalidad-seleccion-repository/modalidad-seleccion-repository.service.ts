import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModalidadSeleccionDTO } from '../../dto/modalidadSeleccion.dto';
import { ModalidadSeleccionEntity } from '../../entities/modalidadSeleccion.entity';
import { ModalidadSeleccionMapperService } from '../../mappers/modalidad-seleccion-mapper/modalidad-seleccion-mapper.service';

@Injectable()
export class ModalidadSeleccionRepositoryService {
  constructor(
    @InjectRepository(ModalidadSeleccionEntity, 'PlanAdquisicionesConection')
    private modalidadSeleccionRepository: Repository<ModalidadSeleccionEntity>,
    private modalidadSeleccionMapper: ModalidadSeleccionMapperService,
  ) {}

  newModalidadSeleccion(
    modalidadSeleccionDTO: ModalidadSeleccionDTO,
  ): Promise<ModalidadSeleccionEntity> {
    const newModalidadSeleccion = this.modalidadSeleccionMapper.dtoToEntity(
      modalidadSeleccionDTO,
    );
    return this.modalidadSeleccionRepository.save(newModalidadSeleccion);
  }
}
