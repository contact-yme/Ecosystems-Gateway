import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const LOGGER = new Logger('main');

  const configService = app.get<ConfigService>(ConfigService);

  const GRPC_BIND = configService.get('GRPC_BIND') || '0.0.0.0:5002';
  const GRPC_GATEWAY_PORT: string = configService.get('GRPC_GATEWAY_PORT') || '0.0.0.0:3000';
  const ENABLE_GRPC_REFLECTION =
    configService.get('ENABLE_GRPC_REFLECTION') || false;
  LOGGER.log(
    `Bind gRPC to '${GRPC_BIND}', gRPC Gateway to '${GRPC_GATEWAY_PORT}' and ${ENABLE_GRPC_REFLECTION ? 'enable' : 'disable'} gRPC Reflection`,
  );

  await app.init();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: GRPC_BIND, // TODO: Fix default values
      package: 'eupg.serviceofferingpublisher',
      protoPath: join(__dirname, './_proto/spp_v2.proto'),

      onLoadPackageDefinition(pkg, server) {
        // Add gRPC server reflection if ENABLE_GRPC_REFLECTION is set either as environment variable or config variable
        if (ENABLE_GRPC_REFLECTION) {
          const grpcReflection = require('@grpc/reflection');
          new grpcReflection.ReflectionService(pkg).addToServer(server);
        }
      },
    },
  });

  await app.startAllMicroservices();

  // We provide a HTTP 2 grpc gateway here, you can safely comment out if not needed
  await app.listen(GRPC_GATEWAY_PORT);
}
bootstrap();
