import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RubrosModule } from './modules/rubros/rubros.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true, } ),
    RubrosModule,
    MongooseModule.forRoot(`mongodb://${process.env.CONECCION_MONGO}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
