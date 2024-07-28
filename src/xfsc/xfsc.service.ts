import axios, { AxiosResponse } from 'axios'

import encodeBase64 from './base64'
import { XFSC_USERNAME, XFSC_PASSWORD, XFSC_CAT_HOST, XFSC_CAT_TOKEN_ENDPOINT } from './config'

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
        this.xfscCatAddr = XFSC_CAT_HOST
        this.xfscTokenEndpoint = XFSC_CAT_TOKEN_ENDPOINT

        this.credentials = encodeBase64(this.username + ':' + this.password)
    }

    async publish(token: string, data: CreateOfferingRequest): Promise<CreateOfferingResponse> {
        const axios = require('axios')
        let response: AxiosResponse<CreateOfferingResponse>

        let config = { 
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr + '/self-descriptions',
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

    update(token: string, data: UpdateOfferingRequest): Promise<UpdateOfferingResponse> {
        const axios = require('axios')
        let response: Promise<JSON>

        let config = { 
            method: 'post',
            maxBodyLength: Infinity,
            url: this.xfscCatAddr + '/self-descriptions',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            data : data
            }

        try {

            response = axios.request(config)
            console.debug('XFSC CAT response:' + response)

        } catch (error) {
            console.log('Error occured while processing the request'+ error.message)
            throw error
        }
        

        return response['data']
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
