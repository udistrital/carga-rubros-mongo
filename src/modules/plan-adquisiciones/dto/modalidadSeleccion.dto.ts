export class ModalidadSeleccionDTO {
    id?: number;
    id_modalidad_seleccion: string;
    fecha_modificacion: Date;
    activo: boolean;
    fecha_creacion: Date;
    registro_plan_adquisiciones_id: number;

    constructor(
        id: number,
        id_modalidad_seleccion: string,
        fecha_modificacion: Date,
        activo: boolean,
        fecha_creacion: Date,
        registro_plan_adquisiciones_id: number,
    ) {
        this.id = id;
        this.id_modalidad_seleccion = id_modalidad_seleccion;
        this.fecha_modificacion = fecha_modificacion;
        this.activo = activo;
        this.fecha_creacion = fecha_creacion;
        this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;
    }
}