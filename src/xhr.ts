import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
    const { methods = 'get', url, data = null, headers } = config
    const request = new XMLHttpRequest()
    request.open(methods.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
            delete headers[name]
        } else {
            request.setRequestHeader(name, headers[name])
        }
    })
    request.send(data)
}
