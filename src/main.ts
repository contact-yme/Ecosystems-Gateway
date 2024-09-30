import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const LOGGER = new Logger('main');

  const configService = app.get<ConfigService>(ConfigService);

  const GRPC_BIND = configService.get('GRPC_BIND') || '0.0.0.0:5002';
  const ENABLE_GRPC_GATEWAY: boolean = configService.get('ENABLE_GRPC_GATEWAY') || false;
  const GRPC_GATEWAY_BIND: string =
    configService.get('GRPC_GATEWAY_BIND') || '0.0.0.0:3000';
  const ENABLE_GRPC_REFLECTION =
    configService.get('ENABLE_GRPC_REFLECTION') || false;
  LOGGER.log(
    `Bind gRPC to '${GRPC_BIND}' and ${ENABLE_GRPC_REFLECTION ? 'enable' : 'disable'} gRPC Reflection`,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: GRPC_BIND,
      package: 'eupg.serviceofferingpublisher',
      protoPath: join(__dirname, './_proto/spp_v2.proto'),

      onLoadPackageDefinition(pkg, server) {
        if (ENABLE_GRPC_REFLECTION) {
          const grpcReflection = require('@grpc/reflection');
          new grpcReflection.ReflectionService(pkg).addToServer(server);
        }
      },
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Connector')
    .setDescription('Interconnectivity by design')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.init();

  if(ENABLE_GRPC_GATEWAY) {
    const GRPC_GATEWAY_INTERFACE_PORT_SPLIT = GRPC_GATEWAY_BIND.split(':', 2);
    await app.listen(GRPC_GATEWAY_INTERFACE_PORT_SPLIT[1], GRPC_GATEWAY_INTERFACE_PORT_SPLIT[0]);
    LOGGER.log(`Application is running on: ${await app.getUrl()}`);
  }
}

bootstrap();
