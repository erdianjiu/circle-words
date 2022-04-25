const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型


//创建music Schema
const MessageSchema = new Schema({
    WordId: ObjectId,
    words: String,
    contact: String,
}, {
    collection: 'Message'
})


//发布模型
mongoose.model('Message', MessageSchema)