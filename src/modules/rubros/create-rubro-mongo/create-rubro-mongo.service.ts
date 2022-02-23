import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRubroDto } from '../dto/create-rubro.dto';
import { Rubros } from '../schemas/rubro.schema';


@Injectable()
export class CreateRubroMongoService {
  constructor(@InjectModel(Rubros.name) private readonly rubroModel: Model<Rubros>) { }

  async create(createRubroDto: CreateRubroDto): Promise<Rubros> {
    const createdRubro = new this.rubroModel(createRubroDto);
    return createdRubro.save();
  }
}
