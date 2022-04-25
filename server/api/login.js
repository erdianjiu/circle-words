const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
    // const { default: axios } = require('axios');
const request = require('request');
const { default: axios } = require('axios');
const PassThrough = require('stream').PassThrough;

let router = new Router()
router.post('/', async(ctx) => {
    //得到验证码code
    let userInfo = ctx.request.body.info
    let code = ctx.request.body.code
        // console.log(code)
        // 请求微信接口，获取openid
    ctx.body = await axios({

            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe3921bc48669d049&secret=5d6aff9d695280f4e2127dc83e9ed9ff&secret=5d6aff9d695280f4e2127dc83e9ed9ff&js_code=' + code + '&grant_type=authorization_code',
            method: "get",

        })
        .then((response) => {

            // console.log(response.data)
            let openid = response.data.openid
            if (openid != undefined) {
                const User = mongoose.model('User')
                    // 查找用户名是否存在，如果存在开始比对密码
                return User.findOne({ openid: openid }).exec().then(async(result) => {
                    if (result) {
                        //用户名存在时
                        return {
                            code: 200,
                            message: "用户存在",
                            // sign 参数一：加密的对象 参数二：加密的规则 参数三：对象
                            token: jwt.sign({ openid: openid }, '3.24finish', {
                                // 过期时间
                                expiresIn: "30d"
                            })
                        }
                    } else {
                        const User = mongoose.model('User')
                        let oneUser = new User({ userInfo: userInfo, openid: openid })
                        oneUser.save().then(() => {
                            console.log(userInfo, '注册成功!')
                        })
                        return {
                            code: 200,
                            message: "注册成功",
                            // sign 参数一：加密的对象 参数二：加密的规则 参数三：对象
                            token: jwt.sign({ openid: openid }, '3.24finish', {
                                // 过期时间
                                expiresIn: "30d"
                            })
                        }

                    }
                }).catch(error => {
                    //出现异常，返回异常
                    console.log(error)
                    return { code: 500, message: error }
                })
            } else {
                return { code: 500, message: "error" }
            }
        })
})

module.exports = router;