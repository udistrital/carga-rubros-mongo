import * as mongoose from 'mongoose';

const PlanAdquisicionesIdScheme = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        descripcion: {
            type: String
        },
        vigencia: {
            type: Number
        },
        activo: {
            type: Boolean,
            default: true
        },
        publicado: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: {
            createdAt: 'fechacreacion',
            updatedAt: 'fechamodificacion'
        },
        _id: false,
        versionKey: false
    }
)

const FichaEBImgaScheme = new mongoose.Schema(
    {
        id: {
            type: Number,
            default: 0
        },
        metaid: {
            type: Number,
            default: 0
        },
        proceso: {
            type: String,
            default: ""
        },
        mangnitud: {
            type: Number,
            default: 0
        },
        unidadmedida: {
            type: String,
            default: ""
        },
        descripcion: {
            type: String,
            default: ""
        },
        activo: {
            type: Boolean,
            default: true
        },
        rubro: {
            type: String,
            default: ""
        },
        planadquisicionesid: {
            type: PlanAdquisicionesIdScheme,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: 'fechacreacion',
            updatedAt: 'fechamodificacion'
        },
        _id: false,
        versionKey: false
    }
);

const FuenteDataScheme = new mongoose.Schema(
    {
        Codigo: {
            type: String
        },
        Nombre: {
            type: String
        },
        UnidadEjecutora: {
            type: String,
            default: "1"
        }
    },
    {
        versionKey: false,
        _id: false
    }
);

const ProductosScheme = new mongoose.Schema(
    {

    },
    {
        versionKey: false,
        _id: false
    }
);

const RubroInfoScheme = new mongoose.Schema(
    {
        Vigencia: {
            type: Number
        },
        Apropiaciones: {
            type: Boolean,
            default: false,
        },
        Productos: ProductosScheme,
        UnidadEjecutora: {
            type: String,
            default: "1"
        },
        Activo: {
            type: Boolean,
            default: true
        },
        Codigo: {
            type: String
        },
        Nombre: {
            type: String
        },
        Padre: {
            type: String
        },
        Bloqueado: {
            type: Boolean,
            default: false
        },
        Descripcion: {
            type: String,
        },
        ValorInicial: {
            type: Number
        },
        Estado: {
            type: String,
            default: "aprobada"
        },
        Hijos: {
            type: Array
        }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        }
    }
);

const MovimientosScheme = new mongoose.Schema(
    {

    },
    {
        versionKey: false,
        _id: false
    }
);


const RubroScheme = new mongoose.Schema(
    {

    },
    {
        versionKey: false,
        _id: false
    }
);


const FuenteFinanciamientoDataScheme = new mongoose.Schema(
    {
        Movimientos: MovimientosScheme,
        TipoDocumento: {
            type: String
        },
        TipoFuente: {
            default: null
        },
        ValorInicial: {
            type: Number
        },
        Activo: {
            type: Boolean,
            default: true
        },
        Codigo: {
            type: String,
        },
        Descripcion: {
            type: String
        },
        Rubros: RubroScheme,
        Estado: {
            type: String,
            default: ""
        },
        NumeroDocumento: {
            type: String,
        },
        UnidadEjecutora: {
            type: String
        },
        Nombre: {
            type: String
        },
        ValorActual: {
            type: Number
        },
        Vigencia: {
            type: Number
        }
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        }
    }
);

const RegistroFuncionamientoModalidadSeleccionScheme = new mongoose.Schema(
    {
        Activo: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number,
        },
        IdModalidadSeleccion: {
            type: String
        },
        Nombre: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const ActividadDataScheme = new mongoose.Schema(
    {

    },
    {
        versionKey: false,
        _id: false
    }
);

const RegistroPlanAdquisicionesCodigoArkaScheme = new mongoose.Schema(
    {
        Id: {
            type: Number
        },
        Activo: {
            type: Boolean,
            default: true
        },
        CodigoArka: {
            type: String
        },
        Descripcion: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false
    }
);

const MetaIdScheme = new mongoose.Schema(
    {
        Numero: {
            type: Number
        },
        Rubro: {
            type: String
        },
        Activo: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number
        },
        LineamientoId: {
            default: null
        },
        Nombre: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const ActividadScheme = new mongoose.Schema(
    {
        Numero: {
            type: String
        },
        Actividad: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number
        },
        MetaId: MetaIdScheme,
        Nombre: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const FuentesFinanciamientoScheme = new mongoose.Schema(
    {
        Id: {
            type: Number,
        },
        Nombre: {
            type: String
        },
        ValorAsignado: {
            type: Number
        },
        Activo: {
            type: Boolean,
            default: true,
        },
        FuenteFinanciamiento: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const RegistroPlanAdquisicionesActividadScheme = new mongoose.Schema(
    {
        Nombre: {
            type: String
        },
        Numero: {
            type: Number
        },
        Valor: {
            type: Number
        },
        Activo: {
            type: Boolean,
            default: true
        },
        NumeroMeta: {
            type: Number
        },
        RegistroActividadId: {
            type: Number
        },
        RegistroPlanAdquisicionesId: {
            type: String
        },
        actividad: ActividadScheme,
        FuentesFinanciamiento: [FuentesFinanciamientoScheme]
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const RegistroFuncionamientoMetasAsociadasScheme = new mongoose.Schema(
    {
        Activo: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number
        },
        MetaId: MetaIdScheme
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const ProductoDataScheme = new mongoose.Schema(
    {
        Nombre: {
            type: String
        },
        Vigencia: {
            type: Number
        },
        _id: {
            type: String
        },
        Activo: {
            type: Boolean,
            default: true
        },
        Codigo: {
            type: Number
        },
        Descripcion: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);

const RegistroFuncionamientoProductosAsociados = new mongoose.Schema(
    {
        ProductoData: ProductoDataScheme,
        Activo: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number
        },
        PorcentajeDistribucion: {
            type: Number
        },
        ProductoAsociadoId: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id: false
    }
);


const DatosRubroScheme = new mongoose.Schema(
    {
        ActividadId: {
            type: Number,
            default: 0
        },
        AreaFuncional: {
            type: Number,
            default: 1
        },
        FuenteFinanciamientoData: FuenteFinanciamientoDataScheme,
        ResponsableNombre: {
            type: String,
        },
        Activo: {
            type: Boolean,
            default: true
        },
        Id: {
            type: Number,
        },
        MetaId: {
            type: String,
            default: ""
        },
        ResponsableId: {
            type: Number,
        },
        'registro_funcionamiento-modalidad_seleccion': [RegistroFuncionamientoModalidadSeleccionScheme],
        FuenteFinanciamientoId: {
            type: String
        },
        RubroId: {
            type: String
        },
        ValorActividad: {
            type: Number
        },
        ActividadData: ActividadDataScheme,
        CentroGestor: {
            type: Number,
            default: 230
        },
        FechaEstimadaFin: {
            type: Date,
        },
        FechaEstimadaInicio: {
            type: Date
        },
        ProductoId: {
            type: String,
            default: ""
        },
        'registro_plan_adquisiciones-codigo_arka': [RegistroPlanAdquisicionesCodigoArkaScheme],
        'registro_plan_adquisiciones-actividad': [RegistroPlanAdquisicionesActividadScheme],
        ValorTotalActividades: {
            type: Number
        },
        'registro_funcionamiento-metas_asociadas': [RegistroFuncionamientoMetasAsociadasScheme],
        'registro_funcionamiento-productos_asociados': [RegistroFuncionamientoProductosAsociados]
    },
    {
        timestamps: {
            createdAt: 'FechaCreacion',
            updatedAt: 'FechaModificacion'
        },
        versionKey: false,
        _id:false
    }
);

const DatosFuenteScheme = new mongoose.Schema(
    {
        Rubro: {
            type: String
        },
        RubroInfo: RubroInfoScheme,
        datos: [DatosRubroScheme]
    },
    {
        _id: false,
        versionKey: false
    }
);

const RegistroPlanAdquisicionesScheme = new mongoose.Schema(
    {
        Fuente: {
            type: String
        },
        FuenteData: [FuenteDataScheme],
        datos: [DatosFuenteScheme]
    },
    {
        versionKey: false,
        _id: false
    }
);

const PlanAdquisicionesScheme = new mongoose.Schema(
    {
        id: {
            type: String
        },
        descripcion: {
            type: String
        },
        vigencia: {
            type: Number
        },
        activo: {
            type: Boolean,
            default: true
        },
        publicado: {
            type: Boolean,
            default: true
        },
        fichaebimga: [FichaEBImgaScheme],
        registroplanadquisiciones: [RegistroPlanAdquisicionesScheme]
    },
    {
        timestamps: {
            createdAt: 'fechacreacion',
            updatedAt: 'fechamodificacion'
        },
        versionKey: false,
        collection: 'plan_adquisiciones'
    }

);

module.exports = mongoose.model('plan_adquisiciones', PlanAdquisicionesScheme);