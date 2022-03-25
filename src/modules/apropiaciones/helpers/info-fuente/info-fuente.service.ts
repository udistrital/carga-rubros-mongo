import { Injectable, Logger } from '@nestjs/common';
import { FuenteService } from '../../services/fuente/fuente.service';
import * as XLSX from 'xlsx';
import { ProductoService } from '../../services/producto/producto.service';

@Injectable()
export class InfoFuenteHelperService {
  vigencia = 2022;
  activo = true;
  tipofuente: null;
  tipoDocumento = 'RESOLUCION';
  unidad_ejecutora = '1';

  constructor(
    private fuenteService: FuenteService,
    private productoService: ProductoService,
  ) {}

  public async uploadFuentes(filedata: Buffer): Promise<void> {
    const workBook = XLSX.read(filedata);
    const workBookSheets = workBook.SheetNames;

    const sheet = workBookSheets[0];

    const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

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

    const max = 99999;
    const min = 0;

    let tempRubro = [];

    const productos = await this.productoService.findAll();

    fuentesNames.forEach(async fuenteName => {
      let acumTotalFuente = 0;
      const fuentesRubro = [];
      const numResolucion = Math.floor(Math.random() * (max - min + 1) + min);

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
}
