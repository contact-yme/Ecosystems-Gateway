import { Injectable } from '@nestjs/common';

@Injectable()
export class PontusxService {
  async publish(vc: any) {
    // do stuff here
    console.log('VC from pontusx publishing:', vc);
  }
}
