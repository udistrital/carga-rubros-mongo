import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class GeneralProducto {
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

type ProductoDocument = Producto & Document;

@Schema({
  collection: 'productos',
  versionKey: false,
})
class Producto {
  @Prop()
  general: GeneralProducto;

  @Prop()
  codigo: string;
}

const ProductoSchema = SchemaFactory.createForClass(Producto);

export { GeneralProducto, ProductoDocument, Producto, ProductoSchema };
