export class PlanAdquisicionesActividadDTO {
  id?: number;
  valor: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  activo: boolean;
  actividad_id: number;
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
  }
}
