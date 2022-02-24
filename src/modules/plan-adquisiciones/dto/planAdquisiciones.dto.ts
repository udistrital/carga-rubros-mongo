export class PlanAdquisicionesDTO {
  id?: string;
  descripcion: string;
  vigencia: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  activo: boolean;
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
  }
}
