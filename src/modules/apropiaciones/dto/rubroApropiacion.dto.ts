export class GeneralRubroApropiacion {
  vigencia: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export class NodoRubroApropiacion {
  general: GeneralRubroApropiacion;
  hijos: any[];
  padre: string;
  unidad_ejecutora: string
  bloqueado: boolean;
  apropiaciones: boolean;
  _id: string;
}

export class Movimientos { }

export class Productos { }

export class RubroApropiacionDTO {
  _id: string;
  nodorubro: NodoRubroApropiacion
  valor_inicial: number;
  valor_actual: number;
  movimientos: Movimientos;
  productos: Productos;
  estado: string;
  padre: string;
  'txn-revno'?: number;
  'txn-queue'?: any[];
}
