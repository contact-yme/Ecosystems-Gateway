import axios from 'axios'
import { XfscService } from './xfsc.service'
jest.mock('axios')
import { CreateOfferingRequest, CreateOfferingResponse } from '../../src/generated/src/_proto/spp'


describe('Xfsc service', () => {
    let xfscService = new XfscService()
    let token :string

    it('Initialize XfscService correctly', () => {
        expect(xfscService.getToken).toBeDefined()
        expect(xfscService.publish).toBeDefined()
        expect(xfscService.update).toBeDefined()
    })

    it('Return token', async () => {
        const mockResponse = {
            data: {
                access_token: 'Token'
            }
        }

        axios.request = jest
        .fn()
        .mockResolvedValue(mockResponse)

        token = await xfscService.getToken()


        expect(mockResponse.data.access_token).toEqual(token)
    })

    it('Publish VC succesfully with the use of the Bearer token', async () => {
        axios.request = jest
        .fn()
        .mockResolvedValue(CreateOfferingResponse)
        

        const data = {} as CreateOfferingRequest 

        const response = await xfscService.publish(token, data)

        expect(CreateOfferingResponse).toEqual(response)
    })

    it.todo('update VC succesfully with the use of the Bearer token')
}) 