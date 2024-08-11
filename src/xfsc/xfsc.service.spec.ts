import axios, { AxiosResponse } from 'axios'
import { XfscService } from './xfsc.service'

jest.mock('axios')
describe('Xfsc service', () => {
    let xfscService = new XfscService()

    it('Token function should return a string', async () => {
        const mockResponse = {
            data: {
                access_token: 'mockToken'
            }
        }

        axios.request = jest
        .fn()
        .mockResolvedValue(mockResponse)

        const token = await xfscService.getToken()

        expect(mockResponse.data.access_token).toBe(token)
    })

    it('Publish function should return ID', async () => {
        const mockVP = {
            key: 'value'
        } as unknown as JSON
        const mockToken = 'mockToken'

        const response: AxiosResponse<JSON> = {
            data: { id: 'mockID' } as unknown as JSON,
            status: 200,
            statusText: 'OK',
            headers: {}, 
            config: {
                headers: undefined
            }
        }

        axios.request = jest
        .fn()
        .mockResolvedValue(response)

        const result = await xfscService.publish(mockToken, mockVP)
        expect(result).toBe('mockID')

        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'post',
            headers: expect.objectContaining({
                'Authorization': `Bearer ${mockToken}`
            }),
            data: mockVP
        }))
    })

    it.todo('Update function should return the ID')
}) 
