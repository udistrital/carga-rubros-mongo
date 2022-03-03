import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'fechaCreacion',
    updatedAt: 'fechaModificacion',
  },
  versionKey: false,
  _id: false,
})
class GeneralRubroApropiacion {
  @Prop()
  vigencia: number;
  RubroApropiacionDocument;
  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ default: true })
  activo: boolean;
}

@Schema({
  versionKey: false,
  _id: false,
})
class NodoRubroApropiacion {
  @Prop()
  general: GeneralRubroApropiacion;

  @Prop({ default: [] })
  hijos: any[];

  @Prop({ default: '' })
  padre: string;

  @Prop({ default: '1' })
  unidad_ejecutora: string;

  @Prop({ default: false })
  bloqueado: boolean;

  @Prop({ default: false })
  apropiaciones: boolean;
}

@Schema({
  versionKey: false,
  _id: false,
})
class Movimientos {}

@Schema({
  versionKey: false,
  _id: false,
})
class Productos {}

type RubroApropiacionDocument = RubroApropiacion & Document;

@Schema({
  collection: 'arbol_rubro_apropiacion_2022_1',
  versionKey: false,
})
class RubroApropiacion {
  @Prop({ unique: true })
  _id: string;

  @Prop()
  nodorubro: NodoRubroApropiacion;

  @Prop({ default: 0 })
  valor_inicial: number;

  @Prop({ default: 0 })
  valor_actual: number;

  @Prop()
  movimientos: Movimientos;

  @Prop()
  productos: Productos;

  @Prop()
  estado: string;

  @Prop()
  padre: string;

  @Prop({ default: 2 })
  'txn-revno': number;

  @Prop({ default: ['61f9a9d0a3d87c0001762cde_e4788073'] })
  'txn-queue': any[];
}

const RubroApropiacionSchema = SchemaFactory.createForClass(RubroApropiacion);

export {
  GeneralRubroApropiacion,
  NodoRubroApropiacion,
  Movimientos,
  Productos,
  RubroApropiacionDocument,
  RubroApropiacion,
  RubroApropiacionSchema,
};
