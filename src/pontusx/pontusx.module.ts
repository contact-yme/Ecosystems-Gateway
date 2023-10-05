import { Module } from '@nestjs/common';
import { PontusxService } from './pontusx.service';

@Module({
  imports: [],
  providers: [PontusxService],
  exports: [PontusxService],
})
export class PontusxModule {}
