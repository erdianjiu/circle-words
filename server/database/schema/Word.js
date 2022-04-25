const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型


//创建music Schema
const wordSchema = new Schema({
    WordId: ObjectId,
    word: String,
    openid: String,
    unacquainted: Number,
    acquainted: Number,
    weight: Number
}, {
    collection: 'word'
})


//发布模型
mongoose.model('Word', wordSchema)