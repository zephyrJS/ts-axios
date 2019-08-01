import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise(resolve => {
        const { methods = 'get', url, data = null, headers, responseType } = config
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }

        request.open(methods.toUpperCase(), url, true)

        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
                return
            }
            const responseHeaders = request.getAllResponseHeaders()
            const responseData = responseType === 'text' ? request.responseText : request.response
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            resolve(response)
        }

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)
    })
}
