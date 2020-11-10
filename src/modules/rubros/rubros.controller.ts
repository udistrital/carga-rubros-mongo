import { Controller, Post, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { RubrosService } from './rubros.service';

@Controller('rubros')
export class RubrosController {

    constructor( private readonly rubrosService: RubrosService ){}

    @Post('carga')
    @UseInterceptors(FileInterceptor('file'))
    cargaRubros(@UploadedFile() file) {
       return this.rubrosService.cargarRubro(file)
    }

    @Get('test')
    prueba() {
        console.log( process.env.ESQUEMA_MONGO )
    }
}
