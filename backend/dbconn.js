const mongoose= require('mongoose')
require('dotenv').config()

const conn= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected')
    }catch(err){
        console.error('Error', err)
    }
}

module.exports= conn