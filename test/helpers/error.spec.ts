import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers:error', () => {
    test('should create an error with message, config', () => {
        const request = new XMLHttpRequest()
        const config: AxiosRequestConfig = { method: 'post' }
        const response: AxiosResponse = {
            status: 200,
            statusText: 'success',
            headers: null,
            request,
            config,
            data: { foo: 'foo' }
        }
        const error = createError('boom', config, 'SOMETHING', request, response)
        expect(error instanceof Error).toBeTruthy()
        expect(error.message).toBe('boom')
        expect(error.config).toBe(config)
        expect(error.code).toBe('SOMETHING')
        expect(error.request).toBe(request)
        expect(error.response).toBe(response)
        expect(error.isAxiosError).toBeTruthy()
    })
})
