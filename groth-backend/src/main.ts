import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  }); //экземпляр приложения
  const config = app.get(ConfigService);
  const port = config.get('port');
  app.useGlobalPipes(new ValidationPipe());

  const swagger = new DocumentBuilder()
    .setTitle('Groth NestJS')
    .setDescription('The groth API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document); // сгенерирует апишку 'api' - префикс для входа

  await app.listen(port);
}
bootstrap();
