import { Logger } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan_adquisiciones.Registro_inversion_actividad-Fuente_financiamiento')
export class RegistroInversionActividadFuenteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fuente_financiamiento_id: string;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 7,
  })
  valor_asignado: number;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  fecha_creacion: Date;

  @Column()
  registro_plan_adquisiciones_actividad_id: number;

  constructor(
    id: number,
    fuente_financiamiento_id: string,
    valor_asignado: number,
    fecha_modificacion: Date,
    activo: boolean,
    fecha_creacion: Date,
    registro_plan_adquisiciones_actividad_id: number,
  ) {
    this.id = id;
    this.fuente_financiamiento_id = fuente_financiamiento_id;
    this.valor_asignado = valor_asignado;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.registro_plan_adquisiciones_actividad_id = registro_plan_adquisiciones_actividad_id;

    // Logger.debbug(
    //   `Se ha creado la entidad Registro Inversión Actividad Fuente Financiamiento para el Registro Plan Adquisiciones Actividad ${this.registro_plan_adquisiciones_actividad_id}`,
    // );
  }
}
