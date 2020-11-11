import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Ingreso y mapeo de Rubros')
    .setDescription('EL api realiza un mapeo de los datos de rubros de sicapital y los ingresa a mongo en su respectiva estrcutura')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
