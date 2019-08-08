import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'

export function normalizeHeaderName(headers: any, normalizeName: string): void {
    if (!headers) return
    Object.keys(headers).forEach(name => {
        if (name.toUpperCase() === normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    const parsed = Object.create(null)
    if (!headers) return parsed

    headers.split('\r\n').forEach(line => {
        let [key, value] = line.split(':')
        key = key.trim().toLowerCase()
        if (!key) return
        if (value) {
            value = value.trim()
        }
        parsed[key] = value
    })
    return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers
    }
    const deletePropsOfHeaders = [
        'get',
        'head',
        'options',
        'delete',
        'post',
        'put',
        'patch',
        'common'
    ]

    headers = deepMerge(headers.common, headers[method], headers)
    deletePropsOfHeaders.forEach(prop => {
        delete headers[prop]
    })

    return headers
}
