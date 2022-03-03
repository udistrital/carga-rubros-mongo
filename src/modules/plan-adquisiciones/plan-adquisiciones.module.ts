import { Module } from '@nestjs/common';
import { PlanAdquisicionesController } from './controllers/plan-adquisiciones/plan-adquisiciones.controller';
import { PlanAdquisicionesService } from './services/plan-adquisiciones/plan-adquisiciones.service';
import { InfoPlanAdquisicionesHelperService } from './helpers/info-plan-adquisiciones-helper/info-plan-adquisiciones-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanAdquisicionesMapperService } from './mappers/plan-adquisiciones-mapper/plan-adquisiciones-mapper.service';
import { PlanAdquisicionesRepositoryService } from './repositories/plan-adquisiciones-repository/plan-adquisiciones-repository.service';
import { PlanAdquisicionesEntity } from './entities/planAdquisiciones.entity';
import { MetaMapperService } from './mappers/meta-mapper/meta-mapper.service';
import { MetaRepositoryService } from './repositories/meta-repository/meta-repository.service';
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
import {
  FuenteFinanciamiento,
  FuenteFinanciamientoSchema,
} from '../apropiaciones/models/fuente.interface';
import {
  FuenteFinanciamientoVigencia,
  FuenteFinanciamientoVigenciaSchema,
} from '../apropiaciones/models/fuente-vigencia.interface';
import {
  Producto,
  ProductoSchema,
} from '../apropiaciones/models/producto.interface';
import { ProductoService } from '../apropiaciones/services/producto/producto.service';
import { ModalidadSeleccionMapperService } from './mappers/modalidad-seleccion-mapper/modalidad-seleccion-mapper.service';
import { ModalidadSeleccionRepositoryService } from './repositories/modalidad-seleccion-repository/modalidad-seleccion-repository.service';
import { ModalidadSeleccionService } from './services/modalidad-seleccion/modalidad-seleccion.service';
import { ModalidadSeleccionEntity } from './entities/modalidadSeleccion.entity';
import { CodigoArkaMapperService } from './mappers/codigo-arka-mapper/codigo-arka-mapper.service';
import { CodigoArkaRepositoryService } from './repositories/codigo-arka-repository/codigo-arka-repository.service';
import { CodigoArkaService } from './services/codigo-arka/codigo-arka.service';
import { CodigoArkaEntity } from './entities/codigoArka.entity';
import { PlanAdquisicionesActividadMapperService } from './mappers/plan-adquisiciones-actividad-mapper/plan-adquisiciones-actividad-mapper.service';
import { PlanAdquisicionesActividadRepositoryService } from './repositories/plan-adquisiciones-actividad-repository/plan-adquisiciones-actividad-repository.service';
import { PlanAdquisicionesActividadEntity } from './entities/planAdquisicionesActividad.entity';
import { PlanAdquisicionesActividadService } from './services/plan-adquisiciones-actividad/plan-adquisiciones-actividad.service';
import { RegistroInversionActividadFuenteMapperService } from './mappers/registro-inversion-actividad-fuente-mapper/registro-inversion-actividad-fuente-mapper.service';
import { RegistroInversionActividadFuenteRepositoryService } from './repositories/registro-inversion-actividad-fuente-repository/registro-inversion-actividad-fuente-repository.service';
import { RegistroInversionActividadFuenteService } from './services/registro-inversion-actividad-fuente/registro-inversion-actividad-fuente.service';
import { RegistroInversionActividadFuenteEntity } from './entities/registroInversionActividadFuente.entity';
import { RegistroProductosAsociadosMapperService } from './mappers/registro-productos-asociados-mapper/registro-productos-asociados-mapper.service';
import { RegistroProductosAsociadosRepositoryService } from './repositories/registro-productos-asociados-repository/registro-productos-asociados-repository.service';
import { RegistroProductosAsociadosService } from './services/registro-productos-asociados/registro-productos-asociados.service';
import { RegistroProductosAsociadosEntity } from './entities/registroProductosAsociados.entity';
import { RegistroMetasAsociadasMapperService } from './mappers/registro-metas-asociadas-mapper/registro-metas-asociadas-mapper.service';
import { RegistroMetasAsociadasRepositoryService } from './repositories/registro-metas-asociadas-repository/registro-metas-asociadas-repository.service';
import { RegistroMetasAsociadasService } from './services/registro-metas-asociadas/registro-metas-asociadas.service';
import { RegistroMetasAsociadasEntity } from './entities/registroMetasAsociadas.entity';

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
      ModalidadSeleccionEntity,
      CodigoArkaEntity,
      PlanAdquisicionesActividadEntity,
      RegistroInversionActividadFuenteEntity,
      RegistroProductosAsociadosEntity,
      RegistroMetasAsociadasEntity
    ]),
    MongooseModule.forFeature([
      { name: FuenteFinanciamiento.name, schema: FuenteFinanciamientoSchema },
      {
        name: FuenteFinanciamientoVigencia.name,
        schema: FuenteFinanciamientoVigenciaSchema,
      },
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
    ProductoService,
    ModalidadSeleccionMapperService,
    ModalidadSeleccionRepositoryService,
    ModalidadSeleccionService,
    CodigoArkaMapperService,
    CodigoArkaRepositoryService,
    CodigoArkaService,
    PlanAdquisicionesActividadMapperService,
    PlanAdquisicionesActividadRepositoryService,
    PlanAdquisicionesActividadService,
    RegistroInversionActividadFuenteMapperService,
    RegistroInversionActividadFuenteRepositoryService,
    RegistroInversionActividadFuenteService,
    RegistroProductosAsociadosMapperService,
    RegistroProductosAsociadosRepositoryService,
    RegistroProductosAsociadosService,
    RegistroMetasAsociadasMapperService,
    RegistroMetasAsociadasRepositoryService,
    RegistroMetasAsociadasService,
  ],
})
export class PlanAdquisicionesModule {}
