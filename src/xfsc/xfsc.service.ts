import axios, { AxiosResponse } from 'axios'

import encodeBase64 from './base64'
import { XFSC_USERNAME, XFSC_PASSWORD, XFSC_CAT_HOST_SD_ENDPOINT, XFSC_CAT_TOKEN_ENDPOINT } from './config'

import {
    CreateOfferingRequest,
    CreateOfferingResponse,
    UpdateOfferingRequest,
    UpdateOfferingResponse,
    UpdateOfferingLifecycleRequest,
    UpdateOfferingLifecycleResponse,
  } from '../generated/src/_proto/spp';


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

    async publish(token: string, data: JSON): Promise<JSON> {
        const axios = require('axios')
        let response: Promise<JSON>

        let config = { 
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            data : data
            }

        await axios.request(config)
        .then(result => { response = result })
        .catch(error => { console.log('Error occured while processing the request '+ error.message)
            throw error })
        console.debug('XFSC CAT response:' + response)
        

        return response['data']
    }

    update(token: string, hash: string, data: JSON): void {
        const del = async (): Promise<void> => {
                let response: JSON
            try {
                response = await axios.delete(this.xfscCatAddr + hash)
            }
            catch (error) {
                console.error('Error occured while trying to delete SD (${hash})')
                throw error
            }
        }

        del()
        console.log('Deleted SD (${hash}) successfully.')

        this.publish(token, data)
        console.log('Published updated SD successfully.')
        console.log('Updating was successfull.')
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
