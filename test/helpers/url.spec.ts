import { buildUrl, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers: url', () => {
    describe('buildUrl', () => {
        test('should support null params', () => {
            expect(buildUrl('/foo')).toBe('/foo')
        })
        test('should support params', () => {
            expect(buildUrl('/foo', { foo: 'bar' })).toBe('/foo?foo=bar')
        })
        test('should ignore if some params value is null', () => {
            expect(
                buildUrl('/foo', {
                    foo: 'bar',
                    test: null
                })
            ).toBe('/foo?foo=bar')
        })
        test('should support object params', () => {
            expect(
                buildUrl('/foo', {
                    foo: {
                        bar: 1
                    }
                })
            ).toBe('/foo?foo=' + encodeURI('{"bar":1}'))
        })
        test('should support date params', () => {
            const date = new Date()
            expect(
                buildUrl('/foo', {
                    date
                })
            ).toBe('/foo?date=' + date.toISOString())
        })
        test('should support array params', () => {
            expect(
                buildUrl('/foo', {
                    foo: ['bar', 'baz']
                })
            ).toBe('/foo?foo[]=bar&foo[]=baz')
        })
        test('should support special char params', () => {
            expect(
                buildUrl('/foo', {
                    foo: '@:$, '
                })
            ).toBe('/foo?foo=@:$,+')
        })
        test('should support existing params', () => {
            expect(
                buildUrl('/foo?foo=bar', {
                    bar: 'baz'
                })
            ).toBe('/foo?foo=bar&bar=baz')
        })
        test('should correct discard url hash mark', () => {
            expect(
                buildUrl('/foo?foo=bar#has', {
                    query: 'baz'
                })
            ).toBe('/foo?foo=bar&query=baz')
        })
        // test('should user serializer if provided', ()=>{
        //     const serializer = jest.fn(()=>{
        //         return 'foo=bar'
        //     })
        //     expect(buildUrl('/foo', 'a=b&c=d')).toBe('/foo?a=b&c=d')
        // })
        // test('should support URLSearchParams', () => {
        //     expect(buildUrl('/foo', )).toBe('/foo?bar=baz')
        // });
    })

    describe('isURLSameOrigin', () => {
        test('should detect same origin', () => {
            expect(isURLSameOrigin(window.location.href)).toBeTruthy()
        })
        test('should detect different origin', () => {
            expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
        })
    })
})
