import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: Omit<OpenAPIObject, 'components' | 'paths'> = new DocumentBuilder()
    .setTitle('API USER MANAGER')
    .setDescription('REST API specification.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  if (process.env.ENVIRONMENT !== 'pro') {
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(',') || '',
  });

  const port = process.env.PORT;

  console.log(`Server is running on http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();
