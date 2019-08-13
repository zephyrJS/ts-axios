import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            method = 'get',
            url,
            data = null,
            headers,
            responseType,
            timeout,
            cancelToken,
            withCredentials
        } = config
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }
        if (withCredentials) {
            request.withCredentials = withCredentials
        }

        request.open(method.toUpperCase(), url!, true)

        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
        }

        request.ontimeout = function handleTimeout() {
            reject(
                createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request)
            )
        }

        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType === 'text' ? request.responseText : request.response
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            })
        }

        request.send(data)

        function handleResponse(response: AxiosResponse): void {
            if (request.status >= 200 && request.status < 300) {
                resolve(response)
            } else {
                reject(
                    createError(
                        `Request failed width status code ${response.status}`,
                        config,
                        response.status,
                        request,
                        response
                    )
                )
            }
        }
    })
}
