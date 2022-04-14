import { Logger } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan_adquisiciones.Registro_plan_adquisiciones-Metas_Asociadas')
export class RegistroMetasAsociadasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  fecha_creacion: Date;

  @Column()
  registro_plan_adquisiciones_id: number;

  @Column()
  meta_id: number;

  constructor(
    id: number,
    fecha_modificacion: Date,
    activo: boolean,
    fecha_creacion: Date,
    registro_plan_adquisiciones_id: number,
    meta_id: number,
  ) {
    this.id = id;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;
    this.meta_id = meta_id;

    // Logger.debbug(
    //   `Se creo la entidad Registro Plan Adquisiciones Metas Asociadas para el Registro Plan Adquisiciones: ${this.registro_plan_adquisiciones_id}`,
    // );
  }
}
