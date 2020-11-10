import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: process.env.ESQUEMA })
export class Rubros extends Document {
    @Prop()
    _id: String

    @Prop(raw({
        vigencia: { type: Number, },
        nombre: { type: String },
        descripcion: { type: String },
        fechaCreacion: { type: Date, default:  new Date()},
        fechaModificacion: { type: Date, default:  new Date() },
        activo: { type: Boolean },
      }))
      general: Record<string, any>;
    
    @Prop()
    hijos: String[]

    @Prop()
    padre: String

    @Prop()
    unidad_ejecutora: String

    @Prop()
    bloqueado: Boolean

    @Prop()
    apropiaciones: Boolean
}

export const RubrosSchema = SchemaFactory.createForClass(Rubros);
