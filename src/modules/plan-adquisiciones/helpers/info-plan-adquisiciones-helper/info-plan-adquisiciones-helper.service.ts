import { Injectable } from '@nestjs/common';
import { FuenteService } from 'src/modules/apropiaciones/services/fuente/fuente.service';
import { ProductoService } from 'src/modules/apropiaciones/services/producto/producto.service';

import * as XLSX from 'xlsx';
import { ActividadService } from '../../services/actividad/actividad.service';
import { MetaService } from '../../services/meta-service/meta.service';
import { PlanAdquisicionesService } from '../../services/plan-adquisiciones/plan-adquisiciones.service';

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

  constructor(
    private planAdquisicionesService: PlanAdquisicionesService,
    private metaService: MetaService,
    private actividadService: ActividadService,
    private fuenteService: FuenteService,
    private productoService: ProductoService,
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

    this.planAdquisicionesService.newPlanAdquisiciones(planAdquisicionesDTO);

    // console.log(row);
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
          metasRubro.forEach(meta => {
            const metaDTO = {
              numero: meta['META'],
              nombre: `Meta de rubro ${meta['RUBRO PRESUPUESTAL']}`,
              fecha_creacion: this.fecha_creacion,
              fecha_modificacion: this.fecha_modificacion,
              activo: this.activo,
              rubro: meta['RUBRO PRESUPUESTAL'],
              lineamiento_id: lineamiento_id,
            };

            this.metaService.newMeta(metaDTO);
          });
          tempRubro = [];
        }
      } else {
        tempRubro.push(row);
        const metasRubro = this.deleteRepetidos(tempRubro, 'META');
        metasRubro.forEach(meta => {
          const metaDTO = {
            numero: meta['META'],
            nombre: `Meta de rubro ${meta['RUBRO PRESUPUESTAL']}`,
            fecha_creacion: this.fecha_creacion,
            fecha_modificacion: this.fecha_modificacion,
            activo: this.activo,
            rubro: meta['RUBRO PRESUPUESTAL'],
            lineamiento_id: lineamiento_id,
          };
          this.metaService.newMeta(metaDTO);
        });
        tempRubro = [];
      }
    });

    dataSheetCalc.forEach(row => {
      const actividadDTO = {
        numero: row['ACTIVIDAD'],
        nombre: row['DESCRIPCIÓN'].substring(0, 249),
        fecha_creacion: this.fecha_creacion,
        fecha_modificacion: this.fecha_modificacion,
        activo: this.activo,
        meta_id: row['META'],
      };

      this.actividadService.newActividad(actividadDTO);
    });

    const keysObject = Object.keys(dataSheetCalc[0]);

    const fuentesNames = keysObject.slice(
      -1 *
        (keysObject.length - keysObject.indexOf('FUENTE DE LOS RECURSOS') - 1),
    );

    //Expresión regular para identificar el código de la fuente
    const re = '[a-zA-Z0-9\\-]{10}';

    fuentesNames.forEach(fuenteName => {
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

      this.fuenteService.createFuenteFinanciamiento(tempFuente);
    });

    const max = 9;
    const min = 0;

    const numResolucion =
      Math.floor(Math.random() * (max - min + 1) + min) * 1000000 +
      Math.floor(Math.random() * (max - min + 1) + min) * 100000 +
      Math.floor(Math.random() * (max - min + 1) + min) * 10000 +
      Math.floor(Math.random() * (max - min + 1) + min) * 1000 +
      Math.floor(Math.random() * (max - min + 1) + min) * 100 +
      Math.floor(Math.random() * (max - min + 1) + min) * 10 +
      Math.floor(Math.random() * (max - min + 1) + min) * 1;

    const fuentesRubro = [];

    let tempTotalRubros = [];

    dataSheetCalc.forEach(row => {
      
    })

    dataSheetCalc.forEach(row => {
      let acumDependencia = 0;
      fuentesNames.forEach(fuenteName => {
        Object.keys(row).forEach(async key => {
          if (key.startsWith(fuenteName.match(re)[0]) && row[key] != 0) {
            acumDependencia = acumDependencia + row[key];
            const productos = await this.productoService
              .findAll()
              .then(res => res);
            const rubro = {
              [row['RUBRO PRESUPUESTAL']]: {
                Productos: productos,
              },
            };

            console.log(rubro, acumDependencia);

            fuentesRubro.push(rubro);
          }
        });
      });
    });

    // console.log(fuentesRubro);
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
