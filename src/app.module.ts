import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RubrosModule } from './modules/rubros/rubros.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [
    RubrosModule,
    MongooseModule.forRoot('mongodb://localhost:27018/prueba'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
