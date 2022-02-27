import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InfoProductoHelperService } from './helpers/info-producto/info-producto.service';
import { InfoRubroHelperService } from './helpers/info-rubro-helper.service';

@ApiTags('Apropiaciones')
@Controller('apropiaciones')
export class ApropiacionesController {

  constructor(
    private infoRubroHelper: InfoRubroHelperService,
    private infoProductoHelper: InfoProductoHelperService) { }

  @Post('cargaRubros')
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
    description:
      'Archivo de apropiaciones generado a partir del plan de adquisiciones',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFileApropiaciones(@UploadedFile() file: Express.Multer.File) {
    this.infoRubroHelper.uploadApropiaciones(file.buffer);
  }

  @Post('cargaProductos')
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
    description:
      'Archivo de productos',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFileProducts(@UploadedFile() file: Express.Multer.File) {
    this.infoProductoHelper.uploadProductos(file.buffer);
  }
}
