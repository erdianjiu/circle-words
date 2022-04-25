const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path');
const fs = require('fs');
//文件上传中间件
mongoose.set('useFindAndModify', false)

let router = new Router()
router.post('/', async(ctx) => {
    let token = ctx.headers.authorization;
    let wordinfo = ctx.request.body
    console.log(wordinfo)
        // 验证token合法性 对token进行解码
    jwt.verify(token, '3.24finish', function(err, decode) {
        // console.log(decode)
        if (err) {
            console.log(err)
            ctx.body = {
                msg: '当前用户未登录',
                code: 500
            }
        } else {
            // token合法
            let openId = decode.openid
            const Word = mongoose.model('Word')
            for (let index = 0; index < wordinfo.length; index++) {
                let oneWord = new Word({
                    word: wordinfo[index],
                    openid: openId,
                    unacquainted: 1,
                    acquainted: 0,
                    weight: 1
                })
                oneWord.save().then(() => {
                    console.log('单词录入成功！')
                })
            }
            ctx.body = {
                msg: '单词插入成功',
                code: 100
            }
        }
    })
})

router.get('/', async(ctx) => {
    //给前端传递数据

    //查找用户名是否存在，如果存在开始比对密码
    let token = ctx.headers.authorization;
    // console.log(token)
    await jwt.verify(token, '3.24finish', async(err, decode) => {
        // console.log(decode)
        let openId = decode.openid;
        console.log(openId);
        const Word = mongoose.model('Word');
        await Word.find({ openid: openId }, (err, docs) => {
            // console.log(docs);
            // return docs
            ctx.body = {
                data: docs.reverse(),
                code: 100
            };
        });
        // console.log(c)
    })

})


module.exports = router;