import { transformRequest, transformResponse } from '../../src/helpers/data'
describe('helpers: data', () => {
    describe('transformRequest', () => {
        test('should transform rquest data to string if data is plainObject', () => {
            const a = { a: 1 }
            expect(transformRequest(a)).toBe('{"a":1}')
        })
        test('should do nothing if data is not plainObject', () => {
            const a = new URLSearchParams('a=b')
            expect(transformRequest(a)).toBe(a)
        })
    })
    describe('transformResponse', () => {
        test('should transform response to object if response is JSON string', () => {
            const a = '{"a":1}'
            expect(transformResponse(a)).toEqual({ a: 1 })
        })
        test('should do nothing if response is string but not JSON string', () => {
            const a = '{a:1}'
            expect(transformResponse(a)).toBe(a)
        })
        test('should do nothing if response is not string', () => {
            const a = { a: 1 }
            expect(transformResponse(a)).toBe(a)
        })
    })
})
