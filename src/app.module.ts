import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontusxService } from './pontusx/pontusx.service';
import { XfscService } from './xfsc/xfsc.service';
import { CredentialEventServiceService } from './credential-event-service/credential-event-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    PontusxService,
    XfscService,
    CredentialEventServiceService,
  ],
})
export class AppModule {}
