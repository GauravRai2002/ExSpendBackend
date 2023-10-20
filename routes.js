const express = require('express')
const { mongoose } = require('mongoose')
const router = express.Router()
const AccountModel = require('./Models/accountModel')
const transactionSchema = require('./Models/transactionModel')

router.get('/balance/:uuid',async(req,res)=>{
    const uuid = req.params.uuid;
    try{
        const account = await AccountModel.findOne({'uuid':`${uuid}`})
        res.send(account)
    }catch(e){
        res.send({
            'error':e,
            'message':'Something went wrong!'
        })
    }
})


router.get('/transactions/:uuid',async(req, res)=>{
    const uuid = req.params.uuid
    const TransactionModel = new mongoose.model(`${uuid}`,transactionSchema)

    try{
        const transactions = new TransactionModel.find()
        res.send(transactions)
    }catch(e){
        res.send({
            'error':e,
            'message':'Something went wrong!'
        })
    }
})


router.post('/account/new',(req,res)=>{
    const account = new AccountModel(req.body)
    try{
        account.save()
        res.send({'message':'Account created Successfully'})
    }catch(e){
        res.send({
            'error':e,
            'message':'Something went wrong!'
        })
    }
})


router.post('/transaction/:uuid',async(req,res)=>{
    const uuid = req.params.uuid
    const TransactionModel = new mongoose.model(`${uuid}`,transactionSchema)
    try{
        const transactions = new TransactionModel(req.body)
        transactions.save()
        const account = await AccountModel.findOne({'uuid':`${uuid}`})
        const newBanalnce = account.transaction_type=='DEPOSIT'?account.balance+req.body.amount: account.balance-req.body.amount
        const newData =account.lower_limit? {
            'uuid':account.uuid,
            'balance':newBanalnce,
            'lower_limit':account.lower_limit
        }:{
            'uuid':account.uuid,
            'balance':newBanalnce
        }
        const setNewBalance = AccountModel.updateOne({'uuid':`${uuid}`,newData})
        res.send({'message':'Transaction added successfully'})
    }catch(e){
        res.send({
            'error':e,
            'message':'Something went wrong!'
        })
    }
})



module.exports = router