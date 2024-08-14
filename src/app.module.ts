import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GrpcController } from './grpc.controller';
import { AppService } from './app.service';
import { CredentialEventServiceModule } from './credential-event-service/credential-event-service.module';
import { PontusxModule } from './pontusx/pontusx.module';
import { XfscModule } from './xfsc/xfsc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CredentialEventServiceModule,
    PontusxModule,
    XfscModule,
  ],
  controllers: [GrpcController],
  providers: [AppService],
})
export class AppModule {}
