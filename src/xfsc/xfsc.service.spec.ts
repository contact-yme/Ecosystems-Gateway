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

    it.todo('update VC succesfully with the use of the Bearer token')
}) 


describe('publish in xfsc catalogue', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const xfscService = new XfscService()
    
    const token = 'testToken'
    let data: CreateOfferingRequest
    let response: CreateOfferingResponse
  
    beforeEach(() => {
      jest.clearAllMocks()
    })
  
    it('should return response data when request is successful', async () => {
      mockedAxios.request.mockResolvedValue({
        data: response,
      })
  
      const result = await xfscService.publish(token, data)
  
      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: 'post',
        maxBodyLength: Infinity,
        url: expect.stringContaining('/self-descriptions'),
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        data: data,
      })
      expect(result).toBe(response)
    })
  
    it('should throw an error when request fails', async () => {
      const errorMessage = 'Network Error'
      mockedAxios.request.mockRejectedValue(new Error(errorMessage))
  
      await expect(xfscService.publish(token, data)).rejects.toThrow(errorMessage)
      expect(mockedAxios.request).toHaveBeenCalledWith({
        method: 'post',
        maxBodyLength: Infinity,
        url: expect.stringContaining('/self-descriptions'),
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        data: data,
      })
    })
  })
  