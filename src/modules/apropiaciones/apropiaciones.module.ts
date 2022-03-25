import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApropiacionesController } from './apropiaciones.controller';
import { InfoProductoHelperService } from './helpers/info-producto/info-producto.service';
import { InfoRubroHelperService } from './helpers/info-rubro-helper.service';
import { Producto, ProductoSchema } from './models/producto.interface';
import {
  RubroApropiacion,
  RubroApropiacionSchema,
} from './models/rubro-apropiacion.interface';
import { ApropiacionesService } from './services/apropiaciones.service';
import { ProductoService } from './services/producto/producto.service';
import { FuenteService } from './services/fuente/fuente.service';
import { FuenteFinanciamiento, FuenteFinanciamientoSchema } from './models/fuente.interface';
import { FuenteFinanciamientoVigencia, FuenteFinanciamientoVigenciaSchema } from './models/fuente-vigencia.interface';
import { CreateRubroMongoService } from '../rubros/create-rubro-mongo/create-rubro-mongo.service';
import { Rubros, RubrosSchema } from '../rubros/schemas/rubro.schema';
import { InfoFuenteHelperService } from './helpers/info-fuente/info-fuente.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
      { name: RubroApropiacion.name, schema: RubroApropiacionSchema },
      { name: FuenteFinanciamiento.name, schema: FuenteFinanciamientoSchema },
      { name: FuenteFinanciamientoVigencia.name, schema: FuenteFinanciamientoVigenciaSchema },
      { name: Rubros.name, schema: RubrosSchema }
    ]),
    ApropiacionesModule,
  ],
  controllers: [ApropiacionesController],
  providers: [
    InfoProductoHelperService,
    ProductoService,
    ApropiacionesService,
    InfoRubroHelperService,
    FuenteService,
    CreateRubroMongoService,
    InfoFuenteHelperService,
  ],
})
export class ApropiacionesModule {}
