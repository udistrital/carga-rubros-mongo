import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';
import { ApropiacionesService } from '../services/apropiaciones.service';
const estado = 'aprobada';
const vigencia = 2022;
const bloqueado = true;

import * as XLSX from 'xlsx';

@Injectable()
export class InfoRubroHelperService {
  padresTotal: any[] = [];
  constructor(private apropiacionesService: ApropiacionesService) {}

  public async uploadApropiaciones(filedata: Buffer): Promise<void> {
    this.padresTotal = [];
    const rubrosInsertar: any[] = [];
    const rubrosTotal: any[] = await superagent
      .get(`${process.env.URLAPIPLANCUENTASMONGO}/arbol_rubro`)
      .then(res => res.body.Body);

    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

    dataSheetCalc.forEach(row => {
      this.getPadres(rubrosTotal, row['RUBRO']);
    });

    // console.log("this.getArrayPadres()[0]: ", this.getArrayPadres())
    const padresObtenidos = this.bubbleSortLenghtRubros(
      this.deleteRepetidosHash(this.getArrayPadres(), 'Codigo'),
    );

    padresObtenidos.forEach(padre => {
      const row = dataSheetCalc.filter(row => row['RUBRO'] == padre['Codigo']);

      if (row.length != 0) {
        const rubroApropiacion = {
          _id: padre['Codigo'],
          nodorubro: {
            general: {
              vigencia: vigencia,
              nombre: row[0]['DESCRIPCION'],
              descripcion: row[0]['DESCRIPCION'],
              activo: false,
              fechaCreacion: Date(),
              fechaModificacion: Date(),
            },
            hijos: padre['Hijos'],
            padre: padre['Padre'],
            unidad_ejecutora: row[0]['CODIGO_UNIDAD_EJECUTORA'],
            bloqueado: bloqueado,
            apropiaciones: padre['Apropiaciones'],
            _id: padre['Codigo'],
          },
          valor_inicial: Math.ceil(row[0]['VALOR']),
          valor_actual: Math.ceil(row[0]['VALOR']),
          movimientos: {},
          productos: {},
          estado: estado,
          padre: padre['Padre'],
        };

        rubrosInsertar.push(rubroApropiacion);
      } else {
        let valorTotal = 0;
        padre['Hijos'].forEach(hijo => {
          const insertado = rubrosInsertar.filter(
            rubro => rubro['_id'] == hijo,
          );

          if (insertado.length != 0) {
            valorTotal = valorTotal + insertado[0]['valor_inicial'];
          }
        });

        const rubroApropiacion = {
          _id: padre['Codigo'],
          nodorubro: {
            general: {
              vigencia: vigencia,
              nombre: padre['nombre'],
              descripcion: padre['Codigo'],
              activo: true,
              fechaCreacion: new Date(),
              fechaModificacion: new Date(),
            },
            hijos: padre['Hijos'],
            padre: padre['Padre'],
            unidad_ejecutora: '1',
            bloqueado: bloqueado,
            apropiaciones: padre['Apropiaciones'],
            _id: padre['Codigo'],
          },
          valor_inicial: Math.ceil(valorTotal),
          valor_actual: Math.ceil(valorTotal),
          movimientos: {},
          productos: {},
          estado: estado,
          padre: padre['Padre'],
        };

        rubrosInsertar.push(rubroApropiacion);
      }
    });

    rubrosInsertar.forEach(rubroInsertar => {
      this.apropiacionesService.create(rubroInsertar);
    });
  }

  public getArrayPadres(): string[] {
    return this.padresTotal;
  }

  public getPadres(rubrosTotal: any[], rubroName: string): void {
    const rubro = rubrosTotal.filter(rubro => rubro['Codigo'] == rubroName);

    if (rubro && rubro.length != 0) {
      if (rubro[0]['Padre'] != '') {
        this.padresTotal.push(rubro[0]);
        this.getPadres(rubrosTotal, rubro[0]['Padre']);
      } else {
        this.padresTotal.push(rubro[0]);
      }
    }
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

  public bubbleSortLenghtRubros(arr: any[]): any[] {
    const l = arr.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (arr[j]['Codigo'].length < arr[j + 1]['Codigo'].length) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    return arr;
  }
}
