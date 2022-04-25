const Router = require('koa-router')
let { options } = require('request');

let PassThrough = require('stream').PassThrough;
let request = require('request')
let router = new Router()

router.post('/', async(ctx) => {

    let base64 = ctx.request.body
        // console.log(JSON.stringify(base64))
        // let res = []
    options = {
            url: "http://thesongof404.top:8866/predict/ocr_system",
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: base64
        }
        // console.log(options)
    ctx.body = await request(options)
        .on('response', response => {
            Object.keys(response.headers).forEach((key) => {
                // if ('content-length' === key) return;
                if ('transfer-encoding' === key) return;
                ctx.set(key, response.headers[key]);
            });
        })
        .on('error', ctx.onerror)
        .pipe(PassThrough())
        // ctx.body = axios().then((response) => {
        //     console.log(response.data.results[0])
        //     let res = response.data.results[0]
        //     return res
        // }).pipe(PassThrough())
})

module.exports = router;