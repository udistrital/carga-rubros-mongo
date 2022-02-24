import { Injectable } from '@nestjs/common';

import * as XLSX from 'xlsx';
import { PlanAdquisicionesService } from '../../services/plan-adquisiciones/plan-adquisiciones.service';

@Injectable()
export class InfoPlanAdquisicionesHelperService {
  descripcion = 'Plan Adquisiciones 2022';
  vigencia = 2022;
  activo = true;
  publicado = false;
  fecha_creacion = new Date();
  fecha_modificacion = new Date();

  constructor(private planAdquisicionesService: PlanAdquisicionesService) {}

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

    dataSheetCalc.forEach(row => {
      // console.log(row);
      //   superagent
      //     .get(
      //       `${process.env.URLAPIPLANCUENTASMONGO}/arbol_rubro/${row['RUBRO']}`,
      //     )
      //     .end((err, res) => {
      //       if (err) {
      //         console.error(err.message);
      //         throw new HttpException(err.message, 500);
      //       } else {
      //         const data = res.body.Body;
      //         if (data) {
      //           const rubroApropiacion = {
      //             _id: data.Codigo,
      //             nodorubro: {
      //               general: {
      //                 vigencia: row[indexVigencia],
      //                 nombre: data.Codigo,
      //                 descripcion: data.Codigo,
      //                 activo: true,
      //               },
      //               hijos: data.Hijos,
      //               padre: data.Padre,
      //               unidad_ejecutora: '1',
      //               bloqueado: data.Bloqueado,
      //               apropiaciones: data.Apropiaciones,
      //             },
      //             valor_inicial: row[indexValor],
      //             valor_actual: row[indexValor],
      //             movimientos: {},
      //             productos: {},
      //             estado: estado,
      //             padre: data.Padre,
      //           };

      //           this.apropiacionesService.create(rubroApropiacion);
      //           HttpCode(HttpStatus.OK);
      //         } else {
      //           console.error(`No encontrado rubro: ${row['RUBRO']}`);
      //         }
      //       }
      //     });
    });
  }
}
