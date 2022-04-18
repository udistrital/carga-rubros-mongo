import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { ProductoService } from '../../services/producto/producto.service';
const vigencia = 0;
const activo = true;

@Injectable()
export class InfoProductoHelperService {

    constructor(private productoService: ProductoService) { }

    public async uploadProductos(filedata: Buffer): Promise<void> {
        const workBook = XLSX.read(filedata);
        const workBookSheets = workBook.SheetNames;

        const sheet = workBookSheets[0];

        const dataSheetCalc = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);

        dataSheetCalc.forEach(row => {
            const producto = {
                general: {
                    vigencia: vigencia,
                    nombre: row['PRODUCTO'],
                    descripcion: row['PRODUCTO'],
                    fechaCreacion: new Date(),
                    fechaModificacion: new Date(),
                    activo: activo,
                },
                codigo: Number(row['CODIGO PRODUCTO'])
              };

              this.productoService.create(producto);
              return HttpCode(HttpStatus.OK);
        })
    }
}
