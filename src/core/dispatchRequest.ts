import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transfrom from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then(res => {
        return transfromResponseData(res)
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.data = transfrom(config.data, config.headers, config.transformRequest)
    config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildUrl(url!, params)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transfrom(res.data, res.headers, res.config.transfromResponse)
    return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested()
    }
}
