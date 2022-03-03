import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const vigencia = 2022;

@Schema()
class GeneralFuenteFinanciamiento {
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

type FuenteFinanciamientoVigenciaDocumento = FuenteFinanciamientoVigencia &
  Document;

@Schema({
  collection: `fuente_financiamiento_${vigencia}_1`,
  versionKey: false,
})
class FuenteFinanciamientoVigencia {
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

const FuenteFinanciamientoVigenciaSchema = SchemaFactory.createForClass(
  FuenteFinanciamientoVigencia,
);

export {
  GeneralFuenteFinanciamiento,
  FuenteFinanciamientoVigenciaDocumento,
  FuenteFinanciamientoVigencia,
  FuenteFinanciamientoVigenciaSchema,
};
