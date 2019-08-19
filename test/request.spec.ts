import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'
describe('requests', () => {
    beforeEach(() => {
        jasmine.Ajax.install()
    })
    afterEach(() => {
        jasmine.Ajax.uninstall()
    })
    test('should create single string are url', () => {
        axios('/foo')
        return getAjaxRequest().then(request => {
            expect(request.url).toBe('/foo')
            expect(request.method).toBe('GET')
        })
    })
})
