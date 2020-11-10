import { HttpException, Injectable } from '@nestjs/common';
import { RubroMongo } from './interfaces/rubro-mongo.interface';
import { CreateRubroMongoService } from './create-rubro-mongo/create-rubro-mongo.service';



@Injectable()
export class RubrosService {

    constructor(private createRubroMongoService: CreateRubroMongoService) { }

    async cargarRubro(archivo) {
        if (archivo.originalname.includes('.xlsx')) {
            const name = archivo.originalname.split('.xlsx')[0]
            const jsonRubros = this.leerArchivo(archivo)[name];
            console.log(jsonRubros.length)
            const jsonOrganizado = this.organizarArbol(jsonRubros)
            console.log(jsonOrganizado.length)
            await this.ingresarRubros(jsonOrganizado);
            return { mensaje: 'exito' }
        } else {
            throw new HttpException('El archivo tiene que tener la extencion de formato .xlsx', 400)

        }
        // return jsonOrganizado
    }

    leerArchivo(archivo) {
        try {
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
        } catch (error) {
            throw new HttpException('ha ocurrido un error al leer el archivo', 500)
        }
    }

    organizarArbol(jsonRubros: any[]) {
        try {
            let respuesta: RubroMongo[] = []
            for (let i = 1; i < 9; i++) { // 1 - 9
                respuesta = respuesta.concat(this.padresConHijos(jsonRubros, i))
            }
            return respuesta
        } catch (error) {
            if (error['response'] !== undefined) {
                throw new HttpException(error['response'], Number(error['status']))
            } else {
                throw new HttpException('ha ocurrido un error al organizar el arbol de rubros', 500)
            }
        }
    }

    padresConHijos(jsonRubros: any[], index: number): RubroMongo[] {
        const campoPadre = `CADENA_NIVEL${index - 1}`
        const campoActual = `CADENA_NIVEL${index}`
        const campoHijo = `CADENA_NIVEL${index + 1}`
        const campoNombre = `DESC_NIVEL${index}`
        const nodos: RubroMongo[] = [];
        try {
            const padres = this.eliminarDuplicados(jsonRubros.map(data => `${data[campoActual]}`))
            padres.forEach(padre => {
                let abuelo: string
                let hijos: string[]
                let unidadEjecutora: string;
                const nodoActual = jsonRubros.find(datoFind => String(datoFind[campoActual]).includes(padre))
                if (index === 1) {
                    abuelo = ""
                } else {
                    abuelo = `${nodoActual[campoPadre]}`
                }
                if (index === 8) {
                    hijos = []
                    unidadEjecutora = `${nodoActual['CODIGO_UNIDAD_EJECUTORA']}`
                } else {
                    const arrayHijos = jsonRubros.filter(datoFiltro => datoFiltro[campoHijo].startsWith(padre))
                    hijos = this.eliminarDuplicados(arrayHijos.map(data => data[campoHijo]))
                    unidadEjecutora = "1"
                }
                nodos.push({
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
                })
            })
            return nodos;
        } catch (error) {
            // console.log(error)
            throw new HttpException('ha ocurrido un error al organizar padre e hijos del arbol', 500)
        }
    }

    eliminarDuplicados(array: any[]) {
        array = array.filter((item, index) => array.indexOf(item) === index);
        return array
    }

    async ingresarRubros(arrayRubros: RubroMongo[]) {
        try {
            for (let i = 0; i < arrayRubros.length; i++) {
                await this.createRubroMongoService.create(arrayRubros[i]);
            }
        } catch (error) {
            throw new HttpException(error, 500)

        }
    }
}
