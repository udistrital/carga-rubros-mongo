import { Logger } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movimiento_proceso_externo')
export class MovimientoProcesoExternoPlanEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_movimiento_id: number;

  @Column()
  proceso_externo: number;

  @Column()
  movimiento_proceso_externo: number;

  @Column()
  activo: boolean;

  @Column()
  fecha_creacion: Date;

  @Column()
  fecha_modificacion: Date;

  @Column()
  detalle: string;

  constructor(
    id: number,
    tipo_movimiento_id: number,
    proceso_externo: number,
    movimiento_proceso_externo: number,
    activo: boolean,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    detalle: string,
  ) {
    this.id = id;
    this.tipo_movimiento_id = tipo_movimiento_id;
    this.proceso_externo = proceso_externo;
    this.movimiento_proceso_externo = movimiento_proceso_externo;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.detalle = detalle;

    // Logger.debbug(
    //   `Se ha creado la entidad Movimiento Proceso Externo Plan para el detalle ${this.detalle}`,
    // );
  }
}
