export class RegistroMetasAsociadasDTO {
  id?: number;
  fecha_modificacion: Date;
  activo: boolean;
  fecha_creacion: Date;
  registro_plan_adquisiciones_id: number;
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
  }
}
