import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RubroApropiacionDTO } from '../dto/rubroApropiacion.dto';
import {
  RubroApropiacion,
  RubroApropiacionDocument,
} from '../models/rubro-apropiacion.interface';

@Injectable()
export class ApropiacionesService {
  constructor(
    @InjectModel(RubroApropiacion.name)
    private rubroApropiacionModel: Model<RubroApropiacionDocument>,
  ) {}

  async create(createRubroDto: RubroApropiacionDTO): Promise<RubroApropiacionDocument> {
    const createdApropiacion = new this.rubroApropiacionModel(createRubroDto);
    return createdApropiacion.save();
  }
}
