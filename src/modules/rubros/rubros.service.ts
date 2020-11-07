import { Injectable } from '@nestjs/common';
import { RubroMongo } from './interfaces/rubro-mongo.interface';


@Injectable()
export class RubrosService {

    cargarRubro(archivo) {
        const name = archivo.originalname.split('.xlsx')[0]
        const jsonRubros = this.leerArchivo(archivo)[name];
        console.log(jsonRubros.length)
        const jsonOrganizado = this.organizarArbol(jsonRubros)
        console.log(jsonOrganizado.length)
        return { mensaje: 'exito' }
        // return jsonOrganizado
    }

    leerArchivo(archivo) {
        const excelToJson = require('convert-excel-to-json');
        // console.log(archivo)
        const result = excelToJson({
            source: archivo.buffer,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        })
        // console.log(result)
        return result
    }

    organizarArbol(jsonRubros: any[]) {
        let respuesta: RubroMongo[] = []
        for (let i = 1; i < 3; i++) { // 1 - 9
            respuesta = respuesta.concat(this.padresConHijos(jsonRubros,i))
        }
        return respuesta
    }

    padresConHijos(jsonRubros: any[], index: number): RubroMongo[] {
        const campoPadre =`CADENA_NIVEL${index-1}`
        const campoActual =`CADENA_NIVEL${index}`
        const campoHijo =`CADENA_NIVEL${index+1}`
        const campoNombre =`DESC_NIVEL${index}`
        const nodos: RubroMongo[] = [];
        const padres = this.eliminarDuplicados( jsonRubros.map( data => `${data[campoActual]}` ))
        padres.forEach( padre => {
            let abuelo: string
            let hijos: string[]
            let unidadEjecutora: string;
            const nodoActual = jsonRubros.find( datoFind => String(datoFind[campoActual]).includes(padre) ) 
            if (index === 1) {
                abuelo = ""
            } else {
                abuelo = `${nodoActual[campoPadre]}`
            }
            if (index === 8) {
                hijos  = []
                unidadEjecutora = `${nodoActual['CODIGO_UNIDAD_EJECUTORA']}`
            } else {
                const arrayHijos = jsonRubros.filter( datoFiltro => datoFiltro[campoHijo].startsWith(padre))
                hijos = this.eliminarDuplicados( arrayHijos.map( data => data[campoHijo] ))
                unidadEjecutora = "1"
            }
            nodos.push( {
                _id: padre,
                general: {
                    vigencia: 0,
                    nombre: nodoActual[campoNombre],
                    descripcion: nodoActual[campoNombre],
                    activo: false
                },
                hijos: hijos,
                padre: abuelo,
                unidad_ejecutora: unidadEjecutora,
                bloqueado: false,
                apropiaciones: false
            } )
        } )
        return nodos;   
    }

    eliminarDuplicados(array: any[]) {
        array = array.filter((item, index) => array.indexOf(item) === index);
        return array
    }
}
