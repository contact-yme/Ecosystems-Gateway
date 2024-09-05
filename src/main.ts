import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // sadly needed to boot nautilus up, otherwise onModuleInit doesn't get triggered :(
  app.init();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5000',
      package: 'eupg.serviceofferingpublisher',
      protoPath: join(__dirname, './_proto/spp_v2.proto'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
