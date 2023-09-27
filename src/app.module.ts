import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { AppService } from './app.service';
import { PontusxService } from './pontusx/pontusx.service';
import { CredentialEventServiceModule } from './credential-event-service/credential-event-service.module';
import { XfscModule } from './xfsc/xfsc.module';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [CredentialEventServiceModule, XfscModule],
  controllers: [RestController, GrpcController],
  providers: [AppService, PontusxService],
})
export class AppModule {}
