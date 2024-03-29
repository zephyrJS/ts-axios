import axios, { AxiosError } from "../../src";

// axios({
//     url: '/base/get',
//     methods: 'get',
//     params: {
//         p: ['foo', 'bar']
//     }
// })

// axios({
//     url: '/base/get',
//     params: {
//         p: {
//             foo: 'foo',
//             bar: 'bar'
//         }
//     }
// })

// const date = new Date()
// axios({
//     url: '/base/get',
//     params: {
//         date
//     }
// })

// axios({
//     url: '/base/get?bar="bar"',
//     params: {
//         foo: 'foo'
//     }
// })

// axios({
//     url: '/base/get',
//     params: {
//         foo: 'foo',
//         baz: null
//     }
// })

// axios({
//     url: '/base/get#1111',
//     params: {
//         foo: 'foo'
//     }
// })

// axios({
//     url: '/base/get',
//     params: {
//         p: '@# '
//     }
// })

// axios({
//     url: '/base/post',
//     methods: 'post',
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const buffer =  new Uint32Array([21,31])
// axios({
//     url: '/base/buffer',
//     methods: 'post',
//     data: buffer
// })

// axios({
//     url: '/base/post',
//     methods: 'post',
//     headers: {
//         'content-type': 'application/json',
//         'accept': 'application/json, text/plain, */*',
//     },
//     data: {
//         c: 1,
//         d: 1
//     }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//     url: '/base/post',
//     methods: 'post',
//     data: searchParams
// })

// axios({
//     url: '/base/post',
//     methods: 'post',
//     data: {
//         a: 1,
//         b: 2
//     }
// }).then((res) => {
//     console.log(res)
// })

// axios({
//     url: '/base/post',
//     methods: 'post',
//     data: {
//         c: 1,
//         d: 2
//     },
//     responseType: 'json'
// }).then((res) => {
//     console.log(res)
// })

// axios({
//     url: '/error/get1'
// }).then(res => {
//     console.log(res)
// }).catch(e => {
//     console.log(e)
// })

// axios({
//     url: '/error/get'
// }).then(res => {
//     console.log(res)
// }).catch((e:AxiosError) => {
//     console.log(e.message)
//     console.log(e.config)
//     console.log(e.code)
//     console.log(e.request)
//     console.log(e.response)
// })

// setTimeout(()=> {
//     axios({
//         url: '/error/get'
//     }).then(res => {
//         console.log(res)
//     }).catch(e => {
//         console.log(e)
//     })
// }, 5000)

// axios({
//     url: '/error/timeout',
//     timeout: 2000
// }).then(res => {
//     console.log(res)
// }).catch(e => {
//     console.log(e)
// })

// axios('/base/post', {
//     method: 'post',
//     data: {
//         a: 1
//     }
// })

interface ResponseData<T> {
    code: number,
    result: T,
    msg: string
}

interface User {
    name: string,
    age: number
}


function getUser<T>() {
    return axios<ResponseData<T>>('/base/user')
        .then(res => res.data)
        .catch(e => console.error(e))
}

async function test() {
    const user = await getUser<User>()
    if(user) {
        console.log(user.result.name)
    }
}

test()

