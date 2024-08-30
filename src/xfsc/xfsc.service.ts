import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class XfscService {
  private token: object;

  constructor(private readonly httpService: HttpService) {}

  publish(vc: any) {
    // do stuff here
    console.log('VC from credentialEventService publishing:', vc);
  }

  async getOffering(did: string, author: string, name: string): Promise<string> {
    const RequestConfig: AxiosRequestConfig = {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }

    const searchParams = new URLSearchParams({});
    if(did) {
      searchParams.set("id", did);

      if(author) {
        searchParams.set("issuer", author);
      }

      return await axios.get(`/self-descriptions?${searchParams.toString()}`, RequestConfig).then((response) => {
        try {
          let resp = JSON.parse(response.data);
          if(resp.items) {
            return resp.items[0].content;
          }
        } catch(Exception) {
          return undefined;
        }
      }).catch((error) => {
        return undefined;
      });
    } else {
      searchParams.set("offset", "0");
      searchParams.set("withContent", "true");
      searchParams.set("withMeta", "false");
      searchParams.set("limit", "1000");
      return await axios.get(`/self-descriptions?${searchParams.toString()}`, RequestConfig).then((response) => {
        try {
          let resp = JSON.parse(response.data);
          let found_items = [];
          resp.items.forEach((item) => {
            found_items.push(item.content);
          })
        } catch(Exception) {
          return undefined;
        }
      }).catch((error) => {
        return undefined;
      });
    }
  }

  async getToken(): Promise<string> {
    // TODO: some caching
    return 'aabec213213';
  }
}
