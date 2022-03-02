import { Injectable, Logger } from '@nestjs/common';
import { FuenteService } from 'src/modules/apropiaciones/services/fuente/fuente.service';
import { ProductoService } from 'src/modules/apropiaciones/services/producto/producto.service';

import * as XLSX from 'xlsx';
import { ActividadService } from '../../services/actividad/actividad.service';
import { CodigoArkaService } from '../../services/codigo-arka/codigo-arka.service';
import { MetaService } from '../../services/meta-service/meta.service';
import { ModalidadSeleccionService } from '../../services/modalidad-seleccion/modalidad-seleccion.service';
import { PlanAdquisicionesActividadService } from '../../services/plan-adquisiciones-actividad/plan-adquisiciones-actividad.service';
import { PlanAdquisicionesService } from '../../services/plan-adquisiciones/plan-adquisiciones.service';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones-service/registro-plan-adquisiciones-service.service';

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

  constructor(
    private planAdquisicionesService: PlanAdquisicionesService,
    private metaService: MetaService,
    private actividadService: ActividadService,
    private fuenteService: FuenteService,
    private productoService: ProductoService,
    private registroPlanAdquisicionesService: RegistroPlanAdquisicionesService,
    private modalidadSeleccionService: ModalidadSeleccionService,
    private codigoArkaService: CodigoArkaService,
    private planAdquisicionesActividadService: PlanAdquisicionesActividadService,
  ) {}

  public async uploadPlanAdquisiciones(filedata: Buffer): Promise<void> {
    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

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

    await this.insertarFuentes(dataSheetCalc);

    this.insertarRegistroPlanAdquisiciones(
      idPlanAdquisicionesInserted,
      dataSheetCalc,
    );
  }

  public insertarMetas(
    rubros: any[],
    idRegistroPlanAdquisicionesInserted: number,
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

      this.insertarActividades(
        meta['META'],
        idMetaInserted,
        rubros,
        idRegistroPlanAdquisicionesInserted,
      );
    });
  }

  public insertarActividades(
    metaNum: number,
    idMetaInserted: number,
    rubros: any[],
    idRegistroPlanAdquisicionesInserted: number,
  ): void {
    const tempActividades = rubros.filter(rubro => rubro['META'] == metaNum);

    tempActividades.forEach(async actividad => {
      const tempActividad = {
        numero: actividad['ACTIVIDAD'],
        nombre: String(actividad['DESCRIPCIÓN']).substring(0, 254),
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
      );
    });
  }

  public async insertRegistroPlanAdquisicionesActividad(
    idRegistroPlanAdquisicionesInserted: number,
    idActividadInserted: number,
    actividad: any,
  ): Promise<void> {
    const tempRegistroPlanAdquisicionesActividad = {
      valor: Number(actividad[`VALOR ASIGNADO ${this.vigencia}`]),
      fecha_creacion: new Date(),
      fecha_modificacion: new Date(),
      activo: this.activo,
      actividad_id: idActividadInserted,
      registro_plan_adquisiciones_id: idRegistroPlanAdquisicionesInserted,
    };

    await this.planAdquisicionesActividadService.newPlanAdquisicionesActividad(
      tempRegistroPlanAdquisicionesActividad,
    );
  }

  public async insertarFuentes(dataSheetCalc: any[]): Promise<void> {
    const keysObject = Object.keys(dataSheetCalc[0]);

    const fuentesNames = keysObject.slice(
      -1 *
        (keysObject.length - keysObject.indexOf('FUENTE DE LOS RECURSOS') - 1),
    );

    //Expresión regular para identificar el código de la fuente
    const re = '[a-zA-Z0-9\\-]{10}';

    fuentesNames.forEach(async fuenteName => {
      const tempFuente = {
        _id: fuenteName.match(re)[0],
        general: {
          vigencia: 0,
          nombre: fuenteName.split('VA-')[1],
          descripcion: fuenteName.split('VA-')[1],
          fechaCreacion: new Date(),
          fechaModificacion: new Date(),
          activo: this.activo,
        },
        tipofuente: this.tipofuente,
        valor_inicial: 0,
        valor_actual: 0,
        estado: '',
        rubros: {},
        numeroDocumento: '',
        tipoDocumento: '',
        unidad_ejecutora: '',
      };

      await this.fuenteService
        .createFuenteFinanciamiento(tempFuente)
        .catch(err => {
          Logger.log(err);
        });
    });

    const max = 9;
    const min = 0;

    let tempRubro = [];

    const productos = await this.productoService.findAll();

    fuentesNames.forEach(async fuenteName => {
      let acumTotalFuente = 0;
      const fuentesRubro = [];
      const numResolucion =
        Math.floor(Math.random() * (max - min + 1) + min) * 1000000 +
        Math.floor(Math.random() * (max - min + 1) + min) * 100000 +
        Math.floor(Math.random() * (max - min + 1) + min) * 10000 +
        Math.floor(Math.random() * (max - min + 1) + min) * 1000 +
        Math.floor(Math.random() * (max - min + 1) + min) * 100 +
        Math.floor(Math.random() * (max - min + 1) + min) * 10 +
        Math.floor(Math.random() * (max - min + 1) + min) * 1;

      dataSheetCalc.forEach(async (row, indexRow) => {
        if (dataSheetCalc[indexRow + 1]) {
          if (tempRubro.length == 0) {
            tempRubro.push(row);
          }
          if (
            tempRubro[tempRubro.length - 1]['RUBRO PRESUPUESTAL'] ==
            dataSheetCalc[indexRow + 1]['RUBRO PRESUPUESTAL']
          ) {
            tempRubro.push(dataSheetCalc[indexRow + 1]);
          } else {
            let acumDependencia = 0;
            tempRubro.forEach(sameRubro => {
              Object.keys(sameRubro).forEach(key => {
                if (
                  key.startsWith(fuenteName.match(re)[0]) &&
                  sameRubro[key] != 0
                ) {
                  acumDependencia = acumDependencia + sameRubro[key];
                }
              });
            });

            acumTotalFuente = acumTotalFuente + acumDependencia;

            if (acumDependencia > 0) {
              const rubro = {
                [tempRubro[0]['RUBRO PRESUPUESTAL']]: {
                  Productos: productos,
                  Dependencias: {
                    Id: tempRubro[0]['RESPONSABLE'],
                    Valor: acumDependencia,
                  },
                },
              };
              fuentesRubro.push(rubro);
            }

            tempRubro = [];
          }
        } else {
          let acumDependencia = 0;

          tempRubro.forEach(sameRubro => {
            Object.keys(sameRubro).forEach(key => {
              if (
                key.startsWith(fuenteName.match(re)[0]) &&
                sameRubro[key] != 0
              ) {
                acumDependencia = acumDependencia + sameRubro[key];
              }
            });
          });

          acumTotalFuente = acumTotalFuente + acumDependencia;

          if (acumDependencia > 0) {
            const rubro = {
              [tempRubro[0]['RUBRO PRESUPUESTAL']]: {
                Productos: productos,
                Dependencias: {
                  Id: tempRubro[0]['RESPONSABLE'],
                  Valor: acumDependencia,
                },
              },
            };
            fuentesRubro.push(rubro);
          }

          tempRubro = [];
        }
      });

      const tempFuente = {
        _id: fuenteName.match(re)[0],
        general: {
          vigencia: this.vigencia,
          nombre: fuenteName.split('VA-')[1],
          descripcion: fuenteName.split('VA-')[1],
          fechaCreacion: new Date(),
          fechaModificacion: new Date(),
          activo: this.activo,
        },
        tipofuente: this.tipofuente,
        valor_inicial: acumTotalFuente,
        valor_actual: acumTotalFuente,
        estado: '',
        rubros: fuentesRubro,
        numeroDocumento: numResolucion.toString(),
        tipoDocumento: this.tipoDocumento,
        unidad_ejecutora: this.unidad_ejecutora,
      };

      await this.fuenteService
        .createFuenteFinanciamientoVigencia(tempFuente)
        .catch(err => {
          Logger.log(err);
        });
    });
  }

  public async insertarRegistroPlanAdquisiciones(
    idPlanAdquisicionesInserted: string,
    dataSheetCalc: any[],
  ): Promise<void> {
    const productos = await this.productoService.findAll();
    const fuentes = await this.fuenteService.findAll();

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
        producto_id: productos[0]['_id'],
        plan_adquisiciones_id: parseInt(idPlanAdquisicionesInserted),
        rubro_id: rubrosTemp[0]['RUBRO PRESUPUESTAL'],
        fecha_estimada_inicio: new Date(
          Date.UTC(0, 0, rubrosTemp[0]['FECHA ESTIMADA INICIO'], -5),
        ),
        fecha_estimada_fin: new Date(
          Date.UTC(0, 0, rubrosTemp[0]['DURACION ESTIMADA'], -5),
        ),
        fuente_financiamiento: fuentes[0]['_id'],
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

      this.insertarMetas(rubrosTemp, idRegistroPlanAdquisicionesInserted);
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

  public insertarCodigoArka(
    codigoArka: any[],
    idRegistroPlanAdquisicionesInserted: number,
  ): void {
    codigoArka.forEach(async codigo => {
      const codigoWithoutSpaces = codigo.replace(/\s+/g, '');
      const codigoArkaDTO = {
        codigo_arka: codigoWithoutSpaces,
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
