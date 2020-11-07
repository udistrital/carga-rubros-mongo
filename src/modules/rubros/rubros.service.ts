import { Injectable } from '@nestjs/common';

@Injectable()
export class RubrosService {

    cargarRubro(archivo) {
        console.log(archivo)
    }
}
