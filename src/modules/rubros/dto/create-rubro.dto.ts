export class CreateRubroDto {
    readonly _id: string;
    readonly general: {
        vigencia: number,
        nombre: string,
        descripcion: string,
        activo: boolean
    };
    readonly hijos: string[];
    readonly padre: string;
    readonly unidad_ejecutora: string;
    readonly bloqueado: boolean;
    readonly apropiaciones: boolean;
  }