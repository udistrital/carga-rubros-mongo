export class RegistroProductosAsociadosDTO {
  id?: number;
  producto_asociado_id: string;
  fecha_modificacion: Date;
  activo: boolean;
  fecha_creacion: Date;
  registro_plan_adquisiciones_id: number;
  porcentaje_distribucion: number;

  constructor(
    id: number,
    producto_asociado_id: string,
    fecha_modificacion: Date,
    activo: boolean,
    fecha_creacion: Date,
    registro_plan_adquisiciones_id: number,
    porcentaje_distribucion: number,
  ) {
    this.id = id;
    this.producto_asociado_id = producto_asociado_id;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;
    this.porcentaje_distribucion = porcentaje_distribucion;
  }
}
