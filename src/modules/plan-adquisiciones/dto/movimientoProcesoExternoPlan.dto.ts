export class MovimientoProcesoExternoPlanDTO {
  id?: number;
  tipo_movimiento_id: number;
  proceso_externo: number;
  movimiento_proceso_externo: number;
  activo: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
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
  }
}
