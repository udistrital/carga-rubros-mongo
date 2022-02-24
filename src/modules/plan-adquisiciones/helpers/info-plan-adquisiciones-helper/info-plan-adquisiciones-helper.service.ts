import { Injectable } from '@nestjs/common';

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

  constructor(
    private planAdquisicionesService: PlanAdquisicionesService,
    private metaService: MetaService,
    private actividadService: ActividadService,
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
          const metasRubro = this.deleteRepetidos(tempRubro);
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
        const metasRubro = this.deleteRepetidos(tempRubro);
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

    dataSheetCalc.forEach((row, index) => {
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
  }

  public deleteRepetidos(array: any[]): any[] {
    const newArray = [];

    array.forEach((item, index) => {
      if (array[index + 1]) {
        if (item['META'] != array[index + 1]['META']) {
          newArray.push(item);
        }
      }
    });

    if (!newArray.includes(array[array.length - 1]['META'])) {
      newArray.push(array[array.length - 1]);
    }

    return newArray;
  }
}
