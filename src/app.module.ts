import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RubrosModule } from './modules/rubros/rubros.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PlanAdquisicionesModule } from './modules/plan-adquisiciones/plan-adquisiciones.module';
import { ApropiacionesModule } from './modules/apropiaciones/apropiaciones.module';

const CONNECTION_STRING = `mongodb://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@${process.env.HOST_MONGO}:${process.env.PORT_MONGO}/${process.env.DB_MONGO}?authSource=admin`;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RubrosModule,
    MongooseModule.forRoot(CONNECTION_STRING),
    PlanAdquisicionesModule,
    ApropiacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {
  constructor() {
    Logger.debug(`CONNECTION_STRING=${CONNECTION_STRING}`);
  }
}

export { AppModule };
