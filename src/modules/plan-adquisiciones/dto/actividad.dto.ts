export class ActividadDTO {
  id?: number;
  numero: number;
  nombre: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  activo: boolean;
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
  }
}
