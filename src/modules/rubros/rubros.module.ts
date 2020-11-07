import { Module } from '@nestjs/common';
import { RubrosController } from './rubros.controller';
import { RubrosService } from './rubros.service';
import { CreateRubroMongoService } from './create-rubro-mongo/create-rubro-mongo.service';
import { Rubros, RubrosSchema } from './schemas/rubro.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Rubros.name, schema: RubrosSchema }])],
  controllers: [RubrosController],
  providers: [RubrosService, CreateRubroMongoService]
})
export class RubrosModule {}
