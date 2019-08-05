import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export class Axios {
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) config = {}
            config.url = url
        } else {
            config = url
        }
        return dispatchRequest(config)
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthoutData('options', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWidthData('patch', url, data, config)
    }

    requestMethodWidthoutData(
        method: Method,
        url: string,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(
            Object.assign(config, {
                method,
                url
            })
        )
    }

    requestMethodWidthData(
        method: Method,
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(
            Object.assign(config, {
                method,
                url,
                data
            })
        )
    }
}
