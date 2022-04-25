const Router = require('koa-router')
const jwt = require('jsonwebtoken')
let router = new Router()

router.post('/', async(ctx) => {
    let token = ctx.headers.authorization;
    console.log(token)
        // 验证token合法性
    jwt.verify(token, '3.24finish', function(err, decode) {
        if (err) {
            console.log(err)
            ctx.body = {
                msg: '当前用户未登录',
                state: false,
            }
        } else {
            // 证明用户已经登录
            // console.log(decode.openid)
            console.log(2323)
            ctx.body = {
                msg: '已登录',
                state: true,
            }
        }
    })
})
module.exports = router;