export class GeneralProducto {
    vigencia: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
    activo: boolean;
}

export class ProductoDTO {
    general: GeneralProducto;
    codigo: string;
}