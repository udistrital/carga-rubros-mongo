import { Injectable } from '@nestjs/common';
import { FuenteService } from 'src/modules/apropiaciones/services/fuente/fuente.service';
import { ProductoService } from 'src/modules/apropiaciones/services/producto/producto.service';

import * as XLSX from 'xlsx';
import { ActividadService } from '../../services/actividad/actividad.service';
import { MetaService } from '../../services/meta-service/meta.service';
import { ModalidadSeleccionService } from '../../services/modalidad-seleccion/modalidad-seleccion.service';
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
  ) {}

  public async uploadPlanAdquisiciones(filedata: Buffer): Promise<void> {
    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

    const productos = await this.productoService.findAll();

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

    await this.insertarMetas(dataSheetCalc);
    await this.insertarActividades(dataSheetCalc);
    await this.insertarFuentes(dataSheetCalc);

    const fuentes = await this.fuenteService.findAll();

    const temRegistroPlanAdquisiciones = {
      area_funcional: this.area_funcional,
      centro_gestor: this.centro_gestor,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      responsable_id: dataSheetCalc[0]['RESPONSABLE'],
      activo: this.activo,
      meta_id: dataSheetCalc[0]['META'],
      producto_id: productos[0]['_id'],
      plan_adquisiciones_id: parseInt(idPlanAdquisicionesInserted),
      rubro_id: dataSheetCalc[0]['RUBRO PRESUPUESTAL'],
      fecha_estimada_inicio: new Date(
        dataSheetCalc[0]['FECHA ESTIMADA INICIO'],
      ),
      fecha_estimada_fin: new Date(dataSheetCalc[0]['DURACION ESTIMADA']),
      fuente_financiamiento: fuentes[0]['_id'],
      actividad_id: dataSheetCalc[0]['ACTIVIDAD'],
      valor_actividad: dataSheetCalc[0][`VALOR ASIGNADO ${this.vigencia}`],
    };

    const idRegistroPlanAdquisicionesInserted = await this.registroPlanAdquisicionesService
      .newRegistroPlanAdquisiciones(temRegistroPlanAdquisiciones)
      .then(res => {
        return res.id;
      });

    const modalidadesNoRepeated = this.deleteRepetidosHash(
      dataSheetCalc,
      'MODALIDAD DE SELECCIÓN',
    );

    console.log('modalidadesNoRepeated.length: ', modalidadesNoRepeated.length);
    console.log("modalidadesNoRepeated: ", modalidadesNoRepeated)

    modalidadesNoRepeated.forEach(async (modalidad) => {
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

  public insertarMetas(dataSheetCalc: any[]): void {
    let tempRubro = [];
    const lineamiento_id = null;

    //INSERTAR METAS
    dataSheetCalc.forEach((row, index) => {
      if (dataSheetCalc[index + 1]) {
        tempRubro.push(row);
        if (
          tempRubro[0]['RUBRO PRESUPUESTAL'] ==
          dataSheetCalc[index + 1]['RUBRO PRESUPUESTAL']
        ) {
          tempRubro.push(row);
        } else {
          tempRubro.push(row);
          const metasRubro = this.deleteRepetidos(tempRubro, 'META');
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

            await this.metaService.newMeta(metaDTO);
          });
          tempRubro = [];
        }
      } else {
        tempRubro.push(row);
        const metasRubro = this.deleteRepetidos(tempRubro, 'META');
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
          await this.metaService.newMeta(metaDTO);
        });
        tempRubro = [];
      }
    });
  }

  public insertarActividades(dataSheetCalc: any[]): void {
    dataSheetCalc.forEach(async row => {
      const actividadDTO = {
        numero: row['ACTIVIDAD'],
        nombre: row['DESCRIPCIÓN'].substring(0, 249),
        fecha_creacion: this.fecha_creacion,
        fecha_modificacion: this.fecha_modificacion,
        activo: this.activo,
        meta_id: row['META'],
      };

      await this.actividadService.newActividad(actividadDTO);
    });
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
          console.log(err);
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
          console.log(err);
        });
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
