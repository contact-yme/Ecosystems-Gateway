import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class XfscService {
  private token: object;

  constructor(private readonly httpService: HttpService) {}

  publish(vc: any) {
    // do stuff here
    console.log('VC from credentialEventService publishing:', vc);
  }

  async getOffering(hash: string): Promise<string> {
    const RequestConfig: AxiosRequestConfig = {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }

    return await axios.get(`/self-descriptions/${hash}`, RequestConfig).then((data) => {
      return data.data;
    }).catch((error) => {
      return error;
    });
  }

  async getToken(): Promise<string> {
    // TODO: some caching
    return 'aabec213213';
  }
}
