import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GeneralFuenteFinanciamiento {
  @Prop()
  vigencia: number;

  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaCreacion: Date;

  @Prop()
  fechaModificacion: Date;

  @Prop()
  activo: boolean;
}

export type FuenteFinanciamientoDocumento = FuenteFinanciamiento & Document;

@Schema({
  collection: 'fuente_financiamiento',
  versionKey: false,
})
export class FuenteFinanciamiento {
  @Prop()
  _id: string;

  @Prop()
  general: GeneralFuenteFinanciamiento;

  @Prop()
  tipofuente: string;

  @Prop()
  valor_inicial: number;

  @Prop()
  valor_actual: number;

  @Prop()
  estado: string;

  @Prop()
  rubros: any;

  @Prop()
  numeroDocumento: string;

  @Prop()
  tipoDocumento: string;

  @Prop()
  unidad_ejecutora: string;
}

export const FuenteFinanciamientoSchema = SchemaFactory.createForClass(
  FuenteFinanciamiento,
);
