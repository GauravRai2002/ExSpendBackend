const { mongoose } = require('mongoose')

const accountSchema = new mongoose.Schema({
    uuid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    lower_limit:{
        type:Number,
    }
})


const AccountModel = new mongoose.model('Account',accountSchema)

module.exports = AccountModel