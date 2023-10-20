const { mongoose } = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    remark:{
        type:String,
    },
    transaction_type:{
        type:String,
        required:true
    }
})

module.exports = transactionSchema