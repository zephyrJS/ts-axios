const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
    return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
    return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
    for (let key in from) {
        ;(to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

export function deepMerge(...objs: any[]): any {
    const result = Object.create(null)
    objs.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (isPlainObject(obj[key])) {
                if (result[key]) {
                    result[key] = deepMerge(result[key], obj[key])
                } else {
                    result[key] = deepMerge(obj[key])
                }
            } else {
                result[key] = obj[key]
            }
        })
    })
    return result
}
