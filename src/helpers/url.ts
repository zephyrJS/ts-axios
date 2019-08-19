import { isDate, isPlainObject } from './utils'

interface URLOrigin {
    protocol: string
    host: string
}

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/\%40/g, '@')
        .replace(/\%3A/gi, ':')
        .replace(/\%24/g, '$')
        .replace(/\%2C/gi, ',')
        .replace(/\%20/g, '+')
        .replace(/\%5B/g, '[')
        .replace(/\%5D/g, ']')
}

export function buildUrl(url: string, params?: any): string {
    if (!params) return url

    const parts: string[] = []
    Object.keys(params).forEach(key => {
        const val = params[key]
        if (val === null || typeof val === 'undefined') {
            return
        }
        let values: string[] = []
        if (Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            values = [val]
        }
        values.forEach(value => {
            if (isDate(value)) {
                value = value.toISOString()
            } else if (isPlainObject(value)) {
                value = JSON.stringify(value)
            }
            parts.push(`${encode(key)}=${encode(value)}`)
        })
    })

    const serializeParams = parts.join('&')
    if (serializeParams) {
        const markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
    }

    return url
}

export function isURLSameOrigin(requestUrl: string): boolean {
    const parseOrigin = resolveUrl(requestUrl)
    return (
        parseOrigin.host === currentOrigin.host && parseOrigin.protocol === currentOrigin.protocol
    )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)

function resolveUrl(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
    return {
        protocol,
        host
    }
}
