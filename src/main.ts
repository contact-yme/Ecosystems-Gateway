import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5002',
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
  // You then need to call app.init() thou, to initialize nautilus/pontus-x.
  // FIXME: make grpc gateway configurable with env variable?
  await app.listen(5001);
}
bootstrap();
