import axios from "../../src";

axios({
    url: '/base/get',
    methods: 'get',
    params: {
        p: ['foo', 'bar']
    }
})

axios({
    url: '/base/get',
    params: {
        p: {
            foo: 'foo',
            bar: 'bar'
        }
    }
})

const date = new Date()
axios({
    url: '/base/get',
    params: {
        date
    }
})

axios({
    url: '/base/get?bar="bar"',
    params: {
        foo: 'foo'
    }
})

axios({
    url: '/base/get',
    params: {
        foo: 'foo',
        baz: null
    }
})

axios({
    url: '/base/get#1111',
    params: {
        foo: 'foo'
    }
})

axios({
    url: '/base/get',
    params: {
        p: '@# '
    }
})
