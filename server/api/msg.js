const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path');
const fs = require('fs');
//文件上传中间件
mongoose.set('useFindAndModify', false)

let router = new Router()
router.post('/', async(ctx) => {
    let Info = ctx.request.body
    console.log(Info)
        // 验证token合法性 对token进行解码
        // token合法
    const Msg = mongoose.model('Message')

    let oneMsg = new Msg({
        words: Info.words,
        contact: Info.contact
    })
    oneMsg.save().then(() => {
        console.log('留言录入成功！')
    })
    ctx.body = {
        msg: "success"
    }

})



module.exports = router;