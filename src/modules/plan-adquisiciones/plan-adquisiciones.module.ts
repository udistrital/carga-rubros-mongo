import { Module } from '@nestjs/common';
import { PlanAdquisicionesController } from './controllers/plan-adquisiciones/plan-adquisiciones.controller';
import { PlanAdquisicionesService } from './services/plan-adquisiciones/plan-adquisiciones.service';
import { InfoPlanAdquisicionesHelperService } from './helpers/info-plan-adquisiciones-helper/info-plan-adquisiciones-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanAdquisicionesMapperService } from './mappers/plan-adquisiciones-mapper/plan-adquisiciones-mapper.service';
import { PlanAdquisicionesRepositoryService } from './repositories/plan-adquisiciones-repository/plan-adquisiciones-repository.service';
import { PlanAdquisicionesEntity } from './entities/planAdquisiciones.entity';
import { MetaMapperService } from './mappers/meta-mapper/meta-mapper.service';
import { MetaRepositoryService } from './repositories/meta-repositorie/meta-repository.service';
import { MetaService } from './services/meta-service/meta.service';
import { MetaEntity } from './entities/meta.entity';
import { ActividadMapperService } from './mappers/actividad-mapper/actividad-mapper.service';
import { ActividadRepositoryService } from './repositories/actividad-repository/actividad-repository.service';
import { ActividadService } from './services/actividad/actividad.service';
import { ActividadEntity } from './entities/actividad.entity';
import { RegistroPlanAdquisicionesMapperService } from './mappers/registro-plan-adquisiciones-mapper/registro-plan-adquisiciones-mapper.service';
import { RegistroPlanAdquisicionesRepositoryService } from './repositories/registro-plan-adquisiciones-repository/registro-plan-adquisiciones-repository.service';
import { RegistroPlanAdquisicionesService } from './services/registro-plan-adquisiciones-service/registro-plan-adquisiciones-service.service';
import { RegistroPlanAdquisicionesEntity } from './entities/registroPlanAdquisiciones.entity';
import { ApropiacionesModule } from '../apropiaciones/apropiaciones.module';
import { FuenteService } from '../apropiaciones/services/fuente/fuente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FuenteFinanciamiento, FuenteFinanciamientoSchema } from '../apropiaciones/models/fuente.interface';
import { FuenteFinanciamientoVigencia } from '../apropiaciones/models/fuente-vigencia.interface';
import { Producto, ProductoSchema } from '../apropiaciones/models/producto.interface';
import { ProductoService } from '../apropiaciones/services/producto/producto.service';

@Module({
  imports: [
    PlanAdquisicionesModule,
    ApropiacionesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: !!process.env.DB_SYNC,
      schema: process.env.DB_SCHEMA,
    }),
    TypeOrmModule.forFeature([
      PlanAdquisicionesEntity,
      MetaEntity,
      ActividadEntity,
      RegistroPlanAdquisicionesEntity,
    ]),
    MongooseModule.forFeature([
      { name: FuenteFinanciamiento.name, schema: FuenteFinanciamientoSchema },
      { name: FuenteFinanciamientoVigencia.name, schema: FuenteFinanciamientoSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [PlanAdquisicionesController],
  providers: [
    PlanAdquisicionesService,
    InfoPlanAdquisicionesHelperService,
    PlanAdquisicionesMapperService,
    PlanAdquisicionesRepositoryService,
    MetaMapperService,
    MetaRepositoryService,
    MetaService,
    ActividadMapperService,
    ActividadRepositoryService,
    ActividadService,
    RegistroPlanAdquisicionesMapperService,
    RegistroPlanAdquisicionesRepositoryService,
    RegistroPlanAdquisicionesService,
    FuenteService,
    ProductoService
  ],
})
export class PlanAdquisicionesModule {}
