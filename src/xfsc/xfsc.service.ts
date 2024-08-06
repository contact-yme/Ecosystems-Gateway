import axios, { AxiosResponse } from 'axios'

import encodeBase64 from './base64'
import { XFSC_USERNAME, XFSC_PASSWORD, XFSC_CAT_HOST_SD_ENDPOINT, XFSC_CAT_TOKEN_ENDPOINT } from './config'


export class XfscService {
    
    private username: string
    private password: string
    private credentials: string
    private readonly xfscCatAddr: string
    private readonly xfscTokenEndpoint: string  
    
    constructor() {
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
            data : data
          }
        
          console.log('Publishing in XFSC CAT ...')
          axios.request(config)
          .then(result => {
            response = result
        })
          .catch(error => {
            console.error('Error occured while trying to Publish VP to XFSC Cat: ' + error)
            throw error
        })

        console.log('Published successfully in XFSC CAT.')

        return response['data']
    }

    revoke(token: string, data: CreateOfferingRequest, vcHash: string): Promise<JSON> {
        const axios = require('axios')
        let response: Promise<JSON>

        let config = { 
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr + '/self-descriptions/' + vcHash + '/revoke',
            headers: { 
              'accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : VP
          }
        
          console.log('Publishing in XFSC CAT ...')
          try {
            response = await axios.request(config)
            console.log('Published successfully in XFSC CAT.')
            return response.data['id']
          } catch (error) {
            console.error('Error occurred while trying to Publish VP to XFSC Cat: ' + error)
            
            throw error
          }
    }

    async update(token: string, hash: string, VP: JSON): Promise<string> {
        // returns ID
        this.delete(token, hash)

        const response: string = await this.publish(token, VP)  // Publish function already returns the SD's ID
        console.log('Published updated SD successfully.')
        console.log('Updating was successfull.')

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
            console.error(error)

            throw error
            })  
        console.log('Successfully deleted SD (${hash})')
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

            console.log('Successfully revoked SD (${hash}).')  
            
            return response.data['id']
          } catch(error) {
            console.log('Error ocuured while processing the request: ')

            throw error
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
