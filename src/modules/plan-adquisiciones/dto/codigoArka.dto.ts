export class CodigoArkaDTO {
  id?: number;
  codigo_arka: string;
  fecha_modificacion: Date;
  activo: boolean;
  fecha_creacion: Date;
  registro_plan_adquisiciones_id: number;

  constructor(
    id: number,
    codigo_arka: string,
    fecha_modificacion: Date,
    activo: boolean,
    fecha_creacion: Date,
    registro_plan_adquisiciones_id: number,
  ) {
    this.id = id;
    this.codigo_arka = codigo_arka;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;
  }
}
