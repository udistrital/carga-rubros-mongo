import { Injectable } from '@nestjs/common';

@Injectable()
export class RubrosService {

    cargarRubro(archivo) {
        const excelToJson = require('convert-excel-to-json');
        console.log(archivo)
        const result = excelToJson({
            source: archivo.buffer,
            header:{
                // Is the numbe,r of rows that will be skipped and will not be present at our result object. Counting from top to bottom
                rows: 1 // 2, 3, 4, etc.
            },
            columnToKey : { 
                '*' : '{{columnHeader}}' 
            } 
        })
        // console.log(result)
        return result
    }
}
