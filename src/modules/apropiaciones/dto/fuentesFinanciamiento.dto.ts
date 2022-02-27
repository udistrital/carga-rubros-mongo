export class GeneralFuenteFinanciamiento {
    vigencia: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
    activo: boolean;
}

export class FuenteFinanciamientoDTO {
    _id: string;
    general: GeneralFuenteFinanciamiento;
    tipofuente: string;
    valor_inicial: number;
    valor_actual: number;
    estado: string;
    rubros: any;
    numeroDocumento: string;
    tipoDocumento: string;
    unidad_ejecutora: string;
}
