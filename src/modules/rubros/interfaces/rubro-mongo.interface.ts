export interface RubroMongo {
    _id: string
    general?: {
        vigencia?: number,
        nombre?: string,
        descripcion?: string,
        activo?: boolean
    },
    hijos: string[],
    padre?: string,
    unidad_ejecutora?: string,
    bloqueado?: boolean,
    apropiaciones?: boolean,
}
