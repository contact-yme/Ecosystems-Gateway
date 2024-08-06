import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5000',
      package: 'eupg.serviceofferingpublisher',
      protoPath: join(__dirname, './_proto/spp_v2_full.proto'),
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Publishing Connector')
    .setDescription(
      'The Connectors API description. It pushes Verifiable Credentials for Gaia-X to different catalogs/marketplaces',
    )
    .setVersion('0.1.0')
    .addTag('publishing-connector')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
