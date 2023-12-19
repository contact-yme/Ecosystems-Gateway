import { Module } from '@nestjs/common';
import { PontusxService } from './pontusx.service';
import { CredentialEventServiceModule } from '../credential-event-service/credential-event-service.module';

@Module({
  imports: [CredentialEventServiceModule],
  providers: [PontusxService],
  exports: [PontusxService],
})
export class PontusxModule {}
