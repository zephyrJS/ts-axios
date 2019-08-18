import {
    parseHeaders,
    processHeaders,
    normalizeHeaderName,
    flattenHeaders
} from '../../src/helpers/headers'

describe('helpers: headers', () => {
    describe('parseHeaders', () => {
        test('should parse headers', () => {
            const parsed = parseHeaders(
                'Content-Type: application/json\r\n' +
                    'Connection:keep-alive\r\n' +
                    'Transfer-Encoding:chunking\r\n' +
                    'Date: Sun, 18 Aug 2019 09:03:45 GMT\r\n' +
                    ':aa\r\n' +
                    'key:'
            )
            expect(parsed['content-type']).toBe('application/json')
            expect(parsed['connection']).toBe('keep-alive')
            expect(parsed['transfer-encoding']).toBe('chunking')
            expect(parsed['date']).toBe('Sun, 18 Aug 2019 09:03:45 GMT')
            expect(parsed['key']).toBe('')
        })

        test('should return empty obj if headers is empty string', () => {
            expect(parseHeaders('')).toEqual({})
        })
    })

    describe('normalizeHeaderName', () => {
        test('should normalize header name', () => {
            const headers: any = {
                'content-type': 'application/json'
            }
            normalizeHeaderName(headers, 'Content-Type')
            expect(headers['Content-Type']).toBe('application/json')
        })
    })

    describe('processHeaders', () => {
        test('should normalize Content-Type header name', () => {
            const headers: any = {
                'content-Type': 'foo/bar',
                'content-length': 1024
            }
            processHeaders(headers, {})
            expect(headers['Content-Type']).toBe('foo/bar')
            expect(headers['content-Type']).toBeUndefined()
            expect(headers['content-length']).toBe(1024)
        })

        test('should Content-Type if data is plainObject', () => {
            const headers: any = {}
            processHeaders(headers, { a: 1 })
            expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
        })

        test('should do nothing if headers is undefined or null', () => {
            expect(processHeaders(undefined, {})).toBeUndefined()
            expect(processHeaders(null, {})).toBeNull()
        })
    })

    describe('flattenHeaders', () => {
        test('should flatten headers and include common headers', () => {
            const headers: any = {
                Accept: 'application/json',
                common: {
                    'X-COMMONG-HEADER': 'commonHeaderValue'
                },
                get: {
                    'X-GET-HEADER': 'getHeaderValue'
                },
                post: {
                    'X-POST-HEADER': 'postHeaderValue'
                }
            }
            expect(flattenHeaders(headers, 'get')).toEqual({
                Accept: 'application/json',
                'X-COMMONG-HEADER': 'commonHeaderValue',
                'X-GET-HEADER': 'getHeaderValue'
            })
        })
        test('should do noting if headers is undefined and null', () => {
            expect(flattenHeaders(undefined, 'get')).toBeUndefined()
            expect(flattenHeaders(null, 'get')).toBeNull()
        })
    })

    test('should flatten headers without common headers', () => {
        const headers: any = {
            Accept: 'application/json',
            get: {
                'X-GET-HEADER': 'getHeaderValue'
            }
        }
        expect(flattenHeaders(headers, 'patch')).toEqual({
            Accept: 'application/json'
        })
    })
})
