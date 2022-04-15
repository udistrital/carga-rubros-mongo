import { Logger } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Plan_adquisiciones')
export class PlanAdquisicionesEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  descripcion: string;

  @Column()
  vigencia: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  publicado: boolean;

  constructor(
    id: string,
    descripcion: string,
    vigencia: number,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    activo: boolean,
    publicado: boolean,
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.vigencia = vigencia;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.publicado = publicado;

    Logger.log(`Se creó la entidad Plan Adquisiciones: ${this.descripcion}`);
  }
}
