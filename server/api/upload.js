const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path');
const fs = require('fs');
let router = new Router()

router.post('/', async(ctx, next) => {
    let token = ctx.headers.authorization;
    // 验证token合法性 对token进行解码
    jwt.verify(token, 'smc@zhq', function(err, decode) {
        if (err) {
            ctx.body = {
                msg: '当前用户未登录',
                code: 500
            }
        } else {
            // token合法
            const file = ctx.request.files.file
                // console.log(file)
            filename = file.name
            const position = ctx.headers.position
            if (position == "music") {
                const uploadpath = path.join(__dirname, "../static/music/")
                const filesave = uploadpath + filename
                    // 流地址
                const reader = fs.createReadStream(file.path);
                // 创建可写流
                const upStream = fs.createWriteStream(filesave);
                // 可读流通过管道写入可写流  
                reader.pipe(upStream)
                ctx.body = {
                    msg: '文件上传成功',
                    // url: 'https://47.102.103.50:3000/music/' + filename,
                    url: 'https://thesongof404.top:3000/music/' + filename,
                    code: 100
                }
            } else if (position == "blog") {
                const uploadpath = path.join(__dirname, "../static/blog/")
                const filesave = uploadpath + filename
                    // 流地址
                const reader = fs.createReadStream(file.path);
                // 创建可写流
                const upStream = fs.createWriteStream(filesave);
                // 可读流通过管道写入可写流  
                reader.pipe(upStream)
                ctx.body = {
                    msg: '文件上传成功',
                    // url: 'https://47.102.103.50:3000/blog/' + filename,
                    url: 'https://thesongof404.top:3000/blog/' + filename,
                    code: 100
                }
            }
        }
    })
});

// 创建可读流

module.exports = router;