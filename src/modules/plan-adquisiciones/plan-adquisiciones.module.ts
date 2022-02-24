import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApropiacionesController } from '../apropiaciones/apropiaciones.controller';
import { InfoRubroHelperService } from '../apropiaciones/helpers/info-rubro-helper.service';
import { ApropiacionesService } from '../apropiaciones/services/apropiaciones.service';
import {
  RubroApropiacion,
  RubroApropiacionSchema,
} from '../apropiaciones/models/rubro-apropiacion.interface';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RubroApropiacion.name, schema: RubroApropiacionSchema },
    ]),
    PlanAdquisicionesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: !!process.env.DB_SYNC,
      schema: process.env.DB_SCHEMA
    }),
    TypeOrmModule.forFeature([PlanAdquisicionesEntity, MetaEntity, ActividadEntity])
  ],
  controllers: [ApropiacionesController, PlanAdquisicionesController],
  providers: [
    ApropiacionesService,
    InfoRubroHelperService,
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
  ],
})
export class PlanAdquisicionesModule {}
