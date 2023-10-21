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
    },
    balance_history:{
        type:[],
        required:true
    },
    remarks_history:{
        type:[],
        required:true
    }
})


const AccountModel = new mongoose.model('Account',accountSchema)

module.exports = AccountModel