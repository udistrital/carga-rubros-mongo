import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as superagent from 'superagent';
import { ApropiacionesService } from '../services/apropiaciones.service';
const indexVigencia = 1;
const indexValor = 2;
const estado = 'aprobada';

import * as XLSX from 'xlsx';

@Injectable()
export class InfoRubroHelperService {
  constructor(private apropiacionesService: ApropiacionesService) {}

  public async uploadApropiaciones(filedata: Buffer): Promise<void> {
    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

    dataSheetCalc.forEach(row => {
      superagent
        .get(
          `${process.env.URLAPIPLANCUENTASMONGO}/arbol_rubro/${row['RUBRO']}`,
        )
        .end((err, res) => {
          if (err) {
            console.error(err.message);
            throw new HttpException(err.message, 500);
          } else {
            const data = res.body.Body;
            if (data) {
              const rubroApropiacion = {
                _id: data.Codigo,
                nodorubro: {
                  general: {
                    vigencia: row[indexVigencia],
                    nombre: data.Codigo,
                    descripcion: data.Codigo,
                    activo: true,
                  },
                  hijos: data.Hijos,
                  padre: data.Padre,
                  unidad_ejecutora: '1',
                  bloqueado: data.Bloqueado,
                  apropiaciones: data.Apropiaciones,
                },
                valor_inicial: row[indexValor],
                valor_actual: row[indexValor],
                movimientos: {},
                productos: {},
                estado: estado,
                padre: data.Padre,
              };

              this.apropiacionesService.create(rubroApropiacion);
              HttpCode(HttpStatus.OK);
            } else {
              console.error(`No encontrado rubro: ${row['RUBRO']}`);
            }
          }
        });
    });
  }
}
