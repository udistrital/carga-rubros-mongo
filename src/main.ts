import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Plan de Adquisiciones y Rubros')
    .setDescription('El API realiza el ingreso de los rubros y los elementos correspondientes al plan de adquisiciones')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
