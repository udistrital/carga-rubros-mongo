import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlanAdquisicionesDTO } from '../../dto/planAdquisiciones.dto';
import { InfoPlanAdquisicionesHelperService } from '../../helpers/info-plan-adquisiciones-helper/info-plan-adquisiciones-helper.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Plan Adquisiciones')
@Controller('plan-adquisiciones')
export class PlanAdquisicionesController {
  constructor(
    private infoPlanAdquisicionesHelperService: InfoPlanAdquisicionesHelperService,
  ) {}

  planAdquisiciones: PlanAdquisicionesDTO;

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
    this.infoPlanAdquisicionesHelperService.uploadPlanAdquisiciones(file.buffer);
  }
}
