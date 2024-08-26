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

  async getOffering(did: string): Promise<string> {
    const RequestConfig: AxiosRequestConfig = {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }

    // offset=0&withContent=true&withMeta=false&limit=1000
    return await axios.get(`/self-descriptions?id=${did}`, RequestConfig).then((response) => {
      try {
        let resp = JSON.parse(response.data);
        if(resp.items) {
          return resp.items[0].content;
        }
      } catch(Exception) {
        return undefined;
      }
    }).catch((error) => {
      return error;
    });
  }

  async searchOffering(did: string)
  {

  }

  async getToken(): Promise<string> {
    // TODO: some caching
    return 'aabec213213';
  }
}
