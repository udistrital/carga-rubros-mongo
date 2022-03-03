export class RegistroInversionActividadFuenteDTO {
  id?: number;
  fuente_financiamiento_id: string;
  valor_asignado: number;
  fecha_modificacion: Date;
  activo: boolean;
  fecha_creacion: Date;
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
  }
}
