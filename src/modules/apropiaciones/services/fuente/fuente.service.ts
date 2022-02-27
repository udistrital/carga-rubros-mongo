import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FuenteFinanciamientoDTO } from '../../dto/fuentesFinanciamiento.dto';
import { FuenteFinanciamientoVigencia, FuenteFinanciamientoVigenciaDocumento } from '../../models/fuente-vigencia.interface';
import { FuenteFinanciamiento, FuenteFinanciamientoDocumento } from '../../models/fuente.interface';

@Injectable()
export class FuenteService {
  constructor(
    @InjectModel(FuenteFinanciamiento.name)
    private fuenteFinanciamientoModel: Model<FuenteFinanciamientoDocumento>,
    @InjectModel(FuenteFinanciamientoVigencia.name)
    private fuenteFinanciamientoVigenciaModel: Model<FuenteFinanciamientoDocumento>
  ) {}

  async createFuenteFinanciamiento(fuenteFinanciamientoDTO: FuenteFinanciamientoDTO): Promise<FuenteFinanciamientoDocumento> {
    const createdFuente = new this.fuenteFinanciamientoModel(fuenteFinanciamientoDTO);
    return createdFuente.save();
  }

  async createFuenteFinanciamientoVigencia(fuenteFinanciamientoDTO: FuenteFinanciamientoDTO): Promise<FuenteFinanciamientoVigenciaDocumento> {
    const createdFuente = new this.fuenteFinanciamientoVigenciaModel(fuenteFinanciamientoDTO);
    return createdFuente.save();
  }
}
