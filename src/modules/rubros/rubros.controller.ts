import { Controller, Post, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RubrosService } from './rubros.service';

@ApiTags('rubros')
@Controller('rubros')
export class RubrosController {

    constructor( private readonly rubrosService: RubrosService ){}

    @Post('carga')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
        description: 'archivo de resultado de la consulta del arbol de rubros de sicapital'
      })
    @UseInterceptors(FileInterceptor('file'))
    cargaRubros(@UploadedFile() file) {
       return this.rubrosService.cargarRubro(file)
    }

    // @Get('test')
    // prueba() {
    //     console.log( process.env.COLLECTION_MONGO )
    // }
}
