import { Logger } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan_adquisiciones.Actividad')
export class ActividadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  nombre: string;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  meta_id: number;

  constructor(
    id: number,
    numero: number,
    nombre: string,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    activo: boolean,
    meta_id: number,
  ) {
    this.id = id;
    this.numero = numero;
    this.nombre = nombre;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.meta_id = meta_id;

    // Logger.debbug(`Se creó la entidad Actividad: ${this.nombre}`);
  }
}
