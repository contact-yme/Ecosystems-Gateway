import { Module } from '@nestjs/common';
import { PontusxService } from './pontusx.service';

@Module({
  imports: [],
  providers: [],
  exports: [PontusxService],
})
export class PontusxModule {}
