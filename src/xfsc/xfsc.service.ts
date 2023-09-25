import { Injectable } from '@nestjs/common';

@Injectable()
export class XfscService {
  publish(vc: any) {
    // do stuff here
    console.log('VC from credentialEventService publishing:', vc);
  }
}
