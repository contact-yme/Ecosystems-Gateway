import { XfscService } from './xfsc.service'

describe('Xfsc service', () => {
    let xfscService: XfscService = new XfscService()

    it('class is initialyzed', () => {
        expect(XfscService).toBeDefined()
    }),
    it('Token is a string', () => {
        const token = xfscService.getToken()
        token.then(token => expect(typeof token).toEqual(typeof 'str'))
    })
}) 