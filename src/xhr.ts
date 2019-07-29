import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
    const { methods = 'get', url, params = null } = config
    const request = new XMLHttpRequest()
    request.open(methods.toUpperCase(), url, true)
    request.send(params)
}
