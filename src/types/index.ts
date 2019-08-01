export type Method =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'patch'
    | 'PATCH'
    | 'options'
    | 'OPTIONS'
    | 'head'
    | 'HEAD'

export interface AxiosRequestConfig {
    url: string
    methods?: Method
    data?: any
    params?: any
    headers?: any
}
