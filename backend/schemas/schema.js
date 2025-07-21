const express= require('express')
const app= express()
const mongoose= require('mongoose')

const schema= new mongoose.Schema({
    sub: {type: String, required: true},
    name: String,
    email: {type: String, required: true},
    picture: String,
   
}, { timestamp: true})

const User= mongoose.model('User', schema);
module.exports= User