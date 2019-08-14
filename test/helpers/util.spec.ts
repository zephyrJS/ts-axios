import {
    isDate,
    isPlainObject,
    isFormData,
    isURLSearchParams,
    extend,
    deepMerge
} from '../../src/helpers/utils'

describe('helpers: util', () => {
    describe('isXX', () => {
        test('should validate Date', () => {
            expect(isDate(new Date())).toBeTruthy()
            expect(isDate(Date.now())).toBeFalsy()
        })

        test('should validate PlainObject', () => {
            expect(isPlainObject({})).toBeTruthy()
            expect(isPlainObject(new Date())).toBeFalsy()
        })

        test('should validate FormData', () => {
            expect(isFormData(new FormData())).toBeTruthy()
            expect(isFormData(new Date())).toBeFalsy()
        })

        test('sholud validate URLSearchParams', () => {
            expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
            expect(isURLSearchParams({})).toBeFalsy()
        })
    })

    describe('extend', () => {
        describe('should be mutable', () => {
            const a = Object.create(null)
            const b = { foo: 123 }
            extend(a, b)

            expect(a.foo).toBe(123)
        })
        describe('should extend properties', () => {
            const a = { foo: 123, bar: 456 }
            const b = { bar: 789 }
            const c = extend(a, b)

            expect(c.foo).toBe(123)
            expect(c.bar).toBe(789)
        })
    })

    describe('deepMerge', () => {
        test('should be imutable', () => {
            const a: any = { bar: 1 }
            const b: any = { foo: 2 }
            const c = Object.create(null)

            deepMerge(a, b, c)

            expect(typeof a.foo).toBe('undefined')
            expect(typeof b.bar).toBe('undefined')
            expect(typeof c.bar).toBe('undefined')
            expect(typeof c.foo).toBe('undefined')
        })

        test('should deepMerge properties', () => {
            const a: any = { bar: 1 }
            const b: any = { foo: 2 }
            const c: any = { foo: 3 }
            const d = deepMerge(a, b, c)

            expect(d.bar).toBe(1)
            expect(d.foo).toBe(3)
        })
    })
})
