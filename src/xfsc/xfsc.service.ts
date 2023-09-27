import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class XfscService {
  private token: object;

  constructor(private readonly httpService: HttpService) {}

  publish(vc: any) {
    // do stuff here
    console.log('VC from credentialEventService publishing:', vc);
  }

  async getToken(): Promise<string> {
    // TODO: some caching
    return 'aabec213213';
  }
}
