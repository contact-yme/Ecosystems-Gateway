import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { GrpcController } from './grpc.controller';
import { AppService } from './app.service';
import { CredentialEventServiceModule } from './credential-event-service/credential-event-service.module';
import { PontusxModule } from './pontusx/pontusx.module';
import { XfscModule } from './xfsc/xfsc.module';

@Module({
  imports: [CredentialEventServiceModule, PontusxModule, XfscModule],
  controllers: [RestController, GrpcController],
  providers: [AppService],
})
export class AppModule {}
