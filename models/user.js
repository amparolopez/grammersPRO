const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imgUrl: { type: String, required: true },
    country: { type: String, required: true },
    googleFlag: {type: Boolean, default: false},
    userAdmin: { type: Boolean, default:false },
})

const User = mongoose.model('user', userSchema)

module.exports = User;