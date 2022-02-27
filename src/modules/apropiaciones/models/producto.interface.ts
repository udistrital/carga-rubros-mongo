import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GeneralProducto {
  @Prop({ default: 0 })
  vigencia: number;

  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaCreacion: Date;

  @Prop()
  fechaModificacion: Date;

  @Prop({ default: true })
  activo: boolean;
}

export type ProductoDocument = Producto & Document;

@Schema({
  collection: 'productos',
  versionKey: false,
})
export class Producto {
  @Prop()
  general: GeneralProducto;

  @Prop()
  codigo: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
