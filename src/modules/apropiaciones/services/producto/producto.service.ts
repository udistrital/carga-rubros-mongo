import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoDTO } from '../../dto/productos.dto';
import { Producto, ProductoDocument } from '../../models/producto.interface';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private productoModel: Model<ProductoDocument>,
  ) {}

  async create(productoDTO: ProductoDTO): Promise<ProductoDocument> {
    const createdProducto = new this.productoModel(productoDTO);
    return createdProducto.save();
  }

  async findAll(): Promise<Producto[]> {
    return this.productoModel
      .find()
      .select('_id')
      .exec();
  }
}
