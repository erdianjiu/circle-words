const Koa = require('koa')
const app = new Koa()
const staticServer = require('koa-static')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const Router = require('koa-router')
    // const bodyparser = require('koa-bodyparser')
const https = require('https')
const sslify = require('koa-sslify').default
const path = require('path')
const koaBody = require('koa-body');
const { connect, initSchemas } = require('./database/init.js')
var fs = require('fs');


const options = {
    key: fs.readFileSync('/root/server1/www.thesongof404.top.key'),
    cert: fs.readFileSync('/root/server1/www.thesongof404.top.pem'),
}



//设置静态文件托管
// const staticPath = path.join(__dirname, "/static")
// app.use(staticServer(staticPath));
//文件上传
app.use(koaBody({
    multipart: true, // 支持文件上传
    strict: false, //设为false
    // strict: false, //如果为true，不解析GET,HEAD,DELETE请求
    formidable: {
        // uploadDir: staticPath, // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 524288000, // 文件上传大小
        // onFileBegin: (name, file) => { // 文件上传前的设置
        //     console.log(`name: ${name}`);
        //     console.log(file);
        // },
    }
}));
//跨域
app.use(cors());

// app.use(bodyparser())
let router = new Router();

// 引入路由

let user = require('./api/login.js')
let word = require('./api/word.js')
let validate = require('./api/validate.js')
    // let upload = require('./api/upload.js')
let ocr = require('./api/ocr.js')
let msg = require('./api/msg.js')



// 装载路由
app.use(router.routes())
app.use(router.allowedMethods())

router.use('/login', user.routes())
router.use('/ocr', ocr.routes())
    // router.use('/upload', upload.routes())
router.use('/validate', validate.routes())
router.use('/word', word.routes())
router.use('/msg', msg.routes())

;
(async() => {
    await connect()
    initSchemas()
})()

app.use(sslify())
https.createServer(options, app.callback()).listen(8080, (err) => {
    if (err) {
        console.log('server error: ', err);
    } else {
        console.log('server at' + 8080);
    }
});