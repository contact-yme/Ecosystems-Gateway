import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: configService.get('GRPC_BIND') || '127.0.0.1:5002', // TODO: Fix default values
      package: 'eupg.serviceofferingpublisher',
      protoPath: join(__dirname, './_proto/spp_v2.proto'),

      onLoadPackageDefinition(pkg, server) {
        // Add gRPC server reflection if ENABLE_GRPC_REFLECTION is set either as environment variable or config variable
        if (Boolean(process.env.ENABLE_GRPC_REFLECTION) || false) {
          console.log('Enabled gRPC Reflection');
          const grpcReflection = require('@grpc/reflection');
          new grpcReflection.ReflectionService(pkg).addToServer(server);
        }
      },
    },
  });

  await app.startAllMicroservices();

  // We provide a HTTP 2 grpc gateway here, you can safely comment out if not needed
  await app.listen(configService.get('GRPC_GATEWAY_BIND') || '0.0.0.0:3000');
}
bootstrap();
