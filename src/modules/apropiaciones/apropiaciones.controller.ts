import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InfoRubroHelperService } from './helpers/info-rubro-helper.service';

@ApiTags('Apropiaciones')
@Controller('apropiaciones')
export class ApropiacionesController {

  constructor(private infoRubroHelper: InfoRubroHelperService) { }

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
    description:
      'Archivo de apropiaciones generado a partir del plan de adquisiciones',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.infoRubroHelper.uploadApropiaciones(file.buffer);
  }
}
