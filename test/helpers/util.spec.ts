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
        test('should be mutable', () => {
            const a = Object.create(null)
            const b = { foo: 123 }
            extend(a, b)

            expect(a.foo).toBe(123)
        })
        test('should extend properties', () => {
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

        test('should deepMerge recursively', () => {
            const a = { foo: { test1: 0 } }
            const b = { foo: { test1: 1 }, bar: { test2: 2 } }
            const c = deepMerge(a, b)

            expect(c).toEqual({
                foo: { test1: 1 },
                bar: { test2: 2 }
            })
        })

        test('should deepMerge not to be', () => {
            const a = { bar: { test: 1 } }
            const b = { foo: { test2: 2 } }
            const c = deepMerge(a, b)

            expect(c).toEqual({
                bar: { test: 1 },
                foo: { test2: 2 }
            })

            expect(c.bar).not.toBe(a.bar)
        })

        test('should handle null and undefined args', () => {
            expect(deepMerge(undefined, undefined)).toEqual({})
            expect(deepMerge(undefined, { a: 1 })).toEqual({ a: 1 })
            expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 })
            expect(deepMerge(null, null)).toEqual({})
            expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 })
            expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 })
        })
    })
})
