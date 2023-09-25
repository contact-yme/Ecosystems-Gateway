import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('VC Schieber')
    .setDescription(
      'The schiebers API description. It pushes Verifiable Credentials for Gaia-X to different catalogs/marketplaces',
    )
    .setVersion('0.1.0')
    .addTag('schieber')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
