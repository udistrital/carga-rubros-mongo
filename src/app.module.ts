import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RubrosModule } from './modules/rubros/rubros.module';

@Module({
  imports: [RubrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
