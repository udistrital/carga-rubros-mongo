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
    MongooseModule.forRoot(`mongodb://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@${process.env.HOST_MONGO}:${process.env.PORT_MONGO}/${process.env.DB_MONGO}?authSource=admin`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
