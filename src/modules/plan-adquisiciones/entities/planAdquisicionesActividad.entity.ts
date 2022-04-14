import { Logger } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Registro_plan_adquisiciones-Actividad')
export class PlanAdquisicionesActividadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 7,
  })
  valor: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  actividad_id: number;

  @Column()
  registro_plan_adquisiciones_id: number;

  constructor(
    id: number,
    valor: number,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    activo: boolean,
    actividad_id: number,
    registro_plan_adquisiciones_id: number,
  ) {
    this.id = id;
    this.valor = valor;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.actividad_id = actividad_id;
    this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;

    // Logger.debbug(
    //   `Se creó la entidad Registro Plan Adquisiciones Actividad para el Registro Plan Adquisiciones: ${registro_plan_adquisiciones_id}`,
    // );
  }
}
