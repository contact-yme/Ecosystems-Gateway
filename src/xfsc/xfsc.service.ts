import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Logger } from '@nestjs/common'

import encodeBase64 from './base64'
import { XFSC_USERNAME, XFSC_PASSWORD, XFSC_CAT_HOST_SD_ENDPOINT, XFSC_CAT_TOKEN_ENDPOINT } from './config'

export class XfscService {
    
    private username: string
    private password: string
    private credentials: string
    private readonly xfscCatAddr: string
    private readonly xfscTokenEndpoint: string  
    private readonly logger: Logger
    
    constructor() {
        this.logger = new Logger(XfscService.name)
        this.username = XFSC_USERNAME  // read .env vars here
        this.password = XFSC_PASSWORD  
        this.xfscCatAddr = XFSC_CAT_HOST_SD_ENDPOINT
        this.xfscTokenEndpoint = XFSC_CAT_TOKEN_ENDPOINT

        this.credentials = encodeBase64(this.username + ':' + this.password)
    }

    async publish(token: string, VP: JSON): Promise<string> {
        // returns ID
        let response: AxiosResponse<JSON>

        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr,
            headers: { 
              'accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : VP
          }
        
        this.logger.log('Publishing in XFSC CAT ...')
        try {
          response = await axios.request(config)
          this.logger.log('Published successfully in XFSC CAT.')
          return response.data['id']
        } catch (error) {
          this.logger.error('Error occurred while trying to Publish VP to XFSC Cat: ' + error)
          
          throw error
        }
    }

    async update(token: string, hash: string, VP: JSON): Promise<string> {
        // returns ID
        this.delete(token, hash)

        const response: string = await this.publish(token, VP)  // Publish function already returns the SD's ID
        this.logger.log('Published updated SD successfully.')

        return response
    }

    async delete(token: string, hash: string): Promise<void> {
        // returns nothing, because there's no body in the Cat's response
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr + hash,
            headers: { 
              'accept': 'application/json', 
              'Authorization': 'Bearer ' + token
            }
          }
          
          axios.request(config)
          .catch(error => {
            this.logger.error(error)

            throw error
            })  
        this.logger.log('Successfully deleted SD (${hash})')
    }

    async revoke(token: string, hash: string): Promise<string> {
        // returns ID

        let response: AxiosResponse<JSON>

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr + hash + '/revoke',
            headers: { 
              'accept': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          }
          
          try {
            response = await axios.request(config)

            this.logger.log('Successfully revoked SD (${hash}).')  
            
            return response.data['id']
          } catch(error) {
            this.logger.error('Error occurred while processing the request: ')

            throw error
          }
    }

  async getOffering(did: string, author: string, name: string): Promise<string> {
    let token = this.getToken();
    const RequestConfig: AxiosRequestConfig = {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
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
        const axios = require('axios')
        const qs = require('qs')
        let data = qs.stringify({
        'grant_type': 'client_credentials' 
        })

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: this.xfscTokenEndpoint,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + this.credentials
        },
        data : data
        }

        const response: Promise<JSON> = await axios.request(config)
        
        return response['data']['access_token']
    }
}
