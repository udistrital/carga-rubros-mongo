import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { FuenteService } from 'src/modules/apropiaciones/services/fuente/fuente.service';
import { ProductoService } from 'src/modules/apropiaciones/services/producto/producto.service';
import * as superagent from 'superagent';

import * as XLSX from 'xlsx';
import { ActividadService } from '../../services/actividad/actividad.service';
import { CodigoArkaService } from '../../services/codigo-arka/codigo-arka.service';
import { MetaService } from '../../services/meta-service/meta.service';
import { ModalidadSeleccionService } from '../../services/modalidad-seleccion/modalidad-seleccion.service';
import { MovimientoProcesoExternoPlanService } from '../../services/movimiento-proceso-externo-plan/movimiento-proceso-externo-plan.service';
import { PlanAdquisicionesActividadService } from '../../services/plan-adquisiciones-actividad/plan-adquisiciones-actividad.service';
import { PlanAdquisicionesService } from '../../services/plan-adquisiciones/plan-adquisiciones.service';
import { RegistroInversionActividadFuenteService } from '../../services/registro-inversion-actividad-fuente/registro-inversion-actividad-fuente.service';
import { RegistroMetasAsociadasService } from '../../services/registro-metas-asociadas/registro-metas-asociadas.service';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones-service/registro-plan-adquisiciones-service.service';
import { RegistroProductosAsociadosService } from '../../services/registro-productos-asociados/registro-productos-asociados.service';

@Injectable()
export class InfoPlanAdquisicionesHelperService {
  descripcion = 'Plan Adquisiciones 2022';
  vigencia = 2022;
  activo = true;
  publicado = false;
  fecha_creacion = new Date();
  fecha_modificacion = new Date();
  tipofuente: null;
  tipoDocumento = 'RESOLUCION';
  unidad_ejecutora = '1';
  area_funcional = 1;
  centro_gestor = 230;
  movimientosDetalle = [];
  registrosFuente = [];
  auxContadorMovimientos = 0;

  constructor(
    private planAdquisicionesService: PlanAdquisicionesService,
    private metaService: MetaService,
    private actividadService: ActividadService,
    private productoService: ProductoService,
    private registroPlanAdquisicionesService: RegistroPlanAdquisicionesService,
    private modalidadSeleccionService: ModalidadSeleccionService,
    private codigoArkaService: CodigoArkaService,
    private planAdquisicionesActividadService: PlanAdquisicionesActividadService,
    private registroInversionActividadFuenteService: RegistroInversionActividadFuenteService,
    private registroProductosAsociadosService: RegistroProductosAsociadosService,
    private registroMetasAsociadasService: RegistroMetasAsociadasService,
    private movimientoProcesoExternoPlanService: MovimientoProcesoExternoPlanService,
  ) {}

  public async uploadPlanAdquisiciones(filedata: Buffer): Promise<void> {
    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

    const keysObject = Object.keys(dataSheetCalc[0]);

    const fuentesNames = keysObject.slice(
      -1 *
        (keysObject.length - keysObject.indexOf('FUENTE DE LOS RECURSOS') - 1),
    );

    this.auxContadorMovimientos = 0;

    dataSheetCalc.forEach(renglon => {
      fuentesNames.forEach(fuenteName => {
        if (renglon[fuenteName] !== 0) {
          this.auxContadorMovimientos = this.auxContadorMovimientos + 1;
        }
      });
    });

    const planAdquisicionesDTO = {
      descripcion: this.descripcion,
      vigencia: this.vigencia,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      publicado: this.publicado,
    };

    const idPlanAdquisicionesInserted = await this.planAdquisicionesService
      .newPlanAdquisiciones(planAdquisicionesDTO)
      .then(res => {
        return res.id;
      });

    const detalle = {
      Estado: 'Preliminar',
      PlanAdquisicionesId: String(idPlanAdquisicionesInserted),
    };

    // Logger.debug(JSON.stringify(detalle))

    const movimientoProcesoExternoPlanDTO = {
      tipo_movimiento_id: Number(process.env.TIPOMOVIMIENTOID),
      proceso_externo: 1,
      movimiento_proceso_externo: 0,
      activo: true,
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
      detalle: JSON.stringify(detalle),
    };

    const idMovimientoProcesoExternoPlanInserted = await this.movimientoProcesoExternoPlanService
      .newMovimientoProcesoExternoPlan(movimientoProcesoExternoPlanDTO)
      .then(res => {
        return res.id;
      });

    this.insertarRegistroPlanAdquisiciones(
      idPlanAdquisicionesInserted,
      dataSheetCalc,
      idMovimientoProcesoExternoPlanInserted,
    );

    Logger.log('Se han insertado los datos correctamente');
  }

  public insertarMetas(
    rubros: any[],
    idRegistroPlanAdquisicionesInserted: number,
    idMovimientoProcesoExternoPlanInserted: number,
  ): void {
    const lineamiento_id = null;

    const metasRubro = this.deleteRepetidos(rubros, 'META');
    metasRubro.forEach(async meta => {
      const metaDTO = {
        numero: meta['META'],
        nombre: `Meta de rubro ${meta['RUBRO PRESUPUESTAL']}`,
        fecha_creacion: this.fecha_creacion,
        fecha_modificacion: this.fecha_modificacion,
        activo: this.activo,
        rubro: meta['RUBRO PRESUPUESTAL'],
        lineamiento_id: lineamiento_id,
      };

      const idMetaInserted = await this.metaService
        .newMeta(metaDTO)
        .then(res => res.id);

      const registroMetasAsociadasDTO = {
        fecha_modificacion: new Date(),
        activo: this.activo,
        fecha_creacion: new Date(),
        registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
        meta_id: idMetaInserted,
      };

      await this.registroMetasAsociadasService.newRegistroMetasAsociadas(
        registroMetasAsociadasDTO,
      );

      this.insertarActividades(
        meta['META'],
        idMetaInserted,
        rubros,
        idRegistroPlanAdquisicionesInserted,
        meta['RUBRO PRESUPUESTAL'],
        idMovimientoProcesoExternoPlanInserted,
      );
    });
  }

  public insertarActividades(
    metaNum: number,
    idMetaInserted: number,
    rubros: any[],
    idRegistroPlanAdquisicionesInserted: number,
    rubroCodigo: string,
    idMovimientoProcesoExternoPlanInserted: number,
  ): void {
    const tempActividades = rubros.filter(rubro => rubro['META'] == metaNum);

    tempActividades.forEach(async actividad => {
      const tempActividad = {
        numero: actividad['ACTIVIDAD'],
        nombre: String(actividad['DESCRIPCIÓN']).substring(0, 249),
        fecha_creacion: new Date(),
        fecha_modificacion: new Date(),
        activo: this.activo,
        meta_id: idMetaInserted,
      };

      const idActividadInserted = await this.actividadService
        .newActividad(tempActividad)
        .then(res => res.id);

      this.insertRegistroPlanAdquisicionesActividad(
        idRegistroPlanAdquisicionesInserted,
        idActividadInserted,
        actividad,
        rubroCodigo,
        idMovimientoProcesoExternoPlanInserted,
      );
    });
  }

  public async insertRegistroPlanAdquisicionesActividad(
    idRegistroPlanAdquisicionesInserted: number,
    idActividadInserted: number,
    actividad: any,
    rubroCodigo: string,
    idMovimientoProcesoExternoPlanInserted: number,
  ): Promise<void> {
    const tempRegistroPlanAdquisicionesActividad = {
      valor: Number(actividad[`VALOR ASIGNADO ${this.vigencia}`]),
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
      activo: this.activo,
      actividad_id: idActividadInserted,
      registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
    };

    const idPlanAdquisicionActividadInserted = await this.planAdquisicionesActividadService
      .newPlanAdquisicionesActividad(tempRegistroPlanAdquisicionesActividad)
      .then(res => [res.id, res.actividad_id]);

    this.insertarRegistroInversionActividadFuente(
      idPlanAdquisicionActividadInserted,
      actividad,
      rubroCodigo,
      idMovimientoProcesoExternoPlanInserted,
    );
  }

  public async insertarRegistroInversionActividadFuente(
    idPlanAdquisicionActividadInserted: number[],
    actividad: any,
    rubroCodigo: string,
    idMovimientoProcesoExternoPlanInserted: number,
  ): Promise<void> {
    const keysObject = Object.keys(actividad);

    const fuentesNames = keysObject.slice(
      -1 *
        (keysObject.length - keysObject.indexOf('FUENTE DE LOS RECURSOS') - 1),
    );

    //Expresión regular para identificar el código de la fuente
    const re = '[a-zA-Z0-9\\-]{10}';

    this.registrosFuente = [];
    fuentesNames.forEach((fuenteName, index) => {
      if (actividad[fuenteName] != 0) {
        const tempRegistroInversionActividadFuente = {
          fuente_financiamiento_id: fuenteName.match(re)[0],
          valor_asignado: actividad[fuenteName],
          fecha_modificacion: new Date(),
          activo: this.activo,
          fecha_creacion: new Date(),
          registro_plan_adquisiciones_actividad_id: idPlanAdquisicionActividadInserted[0],
        };

        this.registrosFuente.push(tempRegistroInversionActividadFuente);

        const detalleCuenPre = {
          RubroId: rubroCodigo,
          // Probar si guardar el Id de la actividad insertada o el id de la actividad propiamente
          ActividadId: idPlanAdquisicionActividadInserted[1],
          FuenteFinanciamientoId: fuenteName.match(re)[0],
        };

        const tempMovimientoDetalle = {
          Cuen_Pre: JSON.stringify(detalleCuenPre),
          Mov_Proc_Ext: String(idMovimientoProcesoExternoPlanInserted),
          Valor: actividad[fuenteName],
        };

        this.movimientosDetalle.push(tempMovimientoDetalle);
      }
    });

    if (this.movimientosDetalle.length === this.auxContadorMovimientos) {
      await superagent
        .post(
          `${process.env.MOVIMIENTOS_CRUD}/movimiento_detalle/crearMovimientosDetalle`,
        )
        .set('accept', 'json')
        .send(JSON.stringify(this.movimientosDetalle))
        .catch(err =>
          Logger.error(
            `Ocurrió un error al insertar los movimientos detalle ${err.message}`,
          ),
        )
        .then(() => Logger.log('Se insertaron los movimientos detalle'));
    }

    this.registrosFuente.forEach(async registro => {
      await this.registroInversionActividadFuenteService.newRegistroInversionActividadFuente(
        registro,
      );
    });
  }

  public async insertarRegistroPlanAdquisiciones(
    idPlanAdquisicionesInserted: string,
    dataSheetCalc: any[],
    idMovimientoProcesoExternoPlanInserted: number,
  ): Promise<void> {
    const productos = await this.productoService.findAll();

    const rubrosNoRepeated = this.deleteRepetidosHash(
      dataSheetCalc,
      'RUBRO PRESUPUESTAL',
    );

    rubrosNoRepeated.forEach(async rubro => {
      const rubrosTemp = [];
      dataSheetCalc.forEach((row, index) => {
        if (row['RUBRO PRESUPUESTAL'] === rubro['RUBRO PRESUPUESTAL']) {
          rubrosTemp.push(row);
        }
      });

      const temRegistroPlanAdquisiciones = {
        area_funcional: this.area_funcional,
        centro_gestor: this.centro_gestor,
        fecha_creacion: new Date(),
        fecha_modificacion: new Date(),
        responsable_id: rubrosTemp[0]['RESPONSABLE'],
        activo: this.activo,
        meta_id: rubrosTemp[0]['META'],
        producto_id: String(productos[0]['_id']),
        plan_adquisiciones_id: parseInt(idPlanAdquisicionesInserted),
        rubro_id: rubrosTemp[0]['RUBRO PRESUPUESTAL'],
        fecha_estimada_inicio: new Date(
          Date.UTC(0, 0, rubrosTemp[0]['FECHA ESTIMADA INICIO'], -5),
        ),
        fecha_estimada_fin: new Date(
          Date.UTC(0, 0, rubrosTemp[0]['DURACION ESTIMADA'], -5),
        ),
        fuente_financiamiento_id: '',
        actividad_id: rubrosTemp[0]['ACTIVIDAD'],
        valor_actividad: rubrosTemp[0][`VALOR ASIGNADO ${this.vigencia}`],
      };

      const idRegistroPlanAdquisicionesInserted = await this.registroPlanAdquisicionesService
        .newRegistroPlanAdquisiciones(temRegistroPlanAdquisiciones)
        .then(res => {
          return res.id;
        });

      const modalidadSeleccionTemp = this.deleteRepetidosHash(
        rubrosTemp,
        'MODALIDAD DE SELECCIÓN',
      );

      this.insertarModalidadSeleccion(
        modalidadSeleccionTemp,
        idRegistroPlanAdquisicionesInserted,
      );

      rubrosTemp.forEach(rubroTemp => {
        const catalogoArkaTemp = String(rubroTemp['CODIGO ARKA']).split('\n');
        this.insertarCodigoArka(
          catalogoArkaTemp,
          idRegistroPlanAdquisicionesInserted,
        );
      });

      this.insertarMetas(
        rubrosTemp,
        idRegistroPlanAdquisicionesInserted,
        idMovimientoProcesoExternoPlanInserted,
      );
      this.insertarRegistroProductosAsociados(
        productos,
        idRegistroPlanAdquisicionesInserted,
      );
    });
  }

  public insertarRegistroProductosAsociados(
    productos: any[],
    idRegistroPlanAdquisicionesInserted: number,
  ): void {
    productos.forEach(async producto => {
      const productoTemp = {
        producto_asociado_id: String(producto['_id']),
        fecha_modificacion: new Date(),
        activo: this.activo,
        fecha_creacion: new Date(),
        registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
        porcentaje_distribucion: Math.floor(100 / productos.length),
      };

      await this.registroProductosAsociadosService.newRegistroProductosAsociados(
        productoTemp,
      );
    });
  }

  public insertarModalidadSeleccion(
    modalidadesSeleccion: any[],
    idRegistroPlanAdquisicionesInserted: number,
  ): void {
    modalidadesSeleccion.forEach(async modalidad => {
      const modalidadSeleccionDTO = {
        id_modalidad_seleccion: modalidad['MODALIDAD DE SELECCIÓN'],
        fecha_modificacion: new Date(),
        activo: this.activo,
        fecha_creacion: new Date(),
        registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
      };

      await this.modalidadSeleccionService.newModalidadSeleccion(
        modalidadSeleccionDTO,
      );
    });
  }

  public async insertarCodigoArka(
    codigoArka: any[],
    idRegistroPlanAdquisicionesInserted: number,
  ): Promise<void> {
    codigoArka.forEach(async codigo => {
      const codigoWithoutSpaces = codigo.replace(/\s+/g, '');
      const idCodigo: any[] = await superagent
        .get(
          `${process.env.CATALOGO_ELEMENTOS_ARKA_URL}/subgrupo?fields=Id,Codigo&limit=1&query=Activo:true,Codigo:${codigoWithoutSpaces}`,
        )
        .then(res => {
          Logger.log("Se encontró el producto del Catálogo Arka")
          return res.body[0].Id;
        })
        .catch(err =>
          Logger.error(
            `Ocurrió un error al consultar el elemento en Arka ${codigoWithoutSpaces} - ${err.message}`,
          ),
        );
      const codigoArkaDTO = {
        codigo_arka: String(idCodigo),
        fecha_modificacion: new Date(),
        activo: this.activo,
        fecha_creacion: new Date(),
        registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
      };

      await this.codigoArkaService.newCodigoArka(codigoArkaDTO);
    });
  }

  public deleteRepetidosHash(array: any[], property: string): any[] {
    const hash = {};
    array = array.filter(function(current) {
      const exists = !hash[current[property]];
      hash[current[property]] = true;
      return exists;
    });

    return array;
  }

  public deleteRepetidos(array: any[], property: string): any[] {
    const newArray = [];

    array.forEach((item, index) => {
      if (array[index + 1]) {
        if (item[property] != array[index + 1][property]) {
          newArray.push(item);
        }
      }
    });

    if (!newArray.includes(array[array.length - 1][property])) {
      newArray.push(array[array.length - 1]);
    }

    return newArray;
  }
}
