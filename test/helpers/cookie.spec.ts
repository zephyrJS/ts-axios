import cookie from '../../src/helpers/cookie'

describe('helper: cookie', () => {
    test('should read cookies', () => {
        document.cookie = 'foo=baz'
        expect(cookie.read('foo')).toBe('baz')
    })
    test('should return null if cookie name is not exit', () => {
        document.cookie = 'baz=foo'
        expect(cookie.read('bar')).toBeNull()
    })
})
