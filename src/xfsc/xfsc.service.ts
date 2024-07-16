import axios from 'axios'

import encodeBase64 from './utils/base64'
import { XFSC_USERNAME, XFSC_PASSWORD } from './config'

import {
    CreateOfferingRequest
  } from '../generated/src/_proto/spp'


export class XfscService {
    private url: string

    private username: string
    private password: string
    private credentials: string
    
    constructor() {
        this.username = XFSC_USERNAME  // read .env vars here => sould be XFSC_USERNAME
        this.password = XFSC_PASSWORD  // read .env vars here => sould be XFSC_PASSWORD
        console.debug(this.username + ':' + this.password)
        this.credentials = encodeBase64(this.username + ':' + this.password)
    }

    publish(token: string, data: JSON): Promise<JSON> {
        const axios = require('axios')
        let response: Promise<JSON>

        let config = { 
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://89.145.162.34/self-descriptions',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            data : data
            }

        try {

            response = axios.request(config)
            console.debug('response:' + response)

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
        url: 'http://89.145.162.34:8080/realms/gaia-x/protocol/openid-connect/token',
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
