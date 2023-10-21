const express = require('express')
const { mongoose } = require('mongoose')
const router = express.Router()
const AccountModel = require('./Models/accountModel')
const transactionSchema = require('./Models/transactionModel')

router.get('/balance/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const account = await AccountModel.findOne({ 'uuid': `${uuid}` })
        res.send(account)
    } catch (e) {
        res.send({
            'error': e,
            'message': 'Something went wrong!'
        })
    }
})


router.get('/transactions/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid
        const TransactionModel = new mongoose.model(`${uuid}`, transactionSchema)
        const transactions = await TransactionModel.find()
        console.log(transactions)
        res.send(transactions)
    } catch (e) {
        console.log(e)
        res.send({
            'error': e,
            'message': 'Something went wrong!'
        })
    }
})


router.post('/account/new', (req, res) => {
    const account = new AccountModel(req.body)
    try {
        account.save()
        res.send({ 'message': 'Account created Successfully' })
    } catch (e) {
        res.send({
            'error': e,
            'message': 'Something went wrong!'
        })
    }
})


router.post('/transaction/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const TransactionModel = new mongoose.model(`${uuid}`, transactionSchema)
    try {
        const transactions = new TransactionModel(req.body)
        transactions.save()
        const account = await AccountModel.findOne({ 'uuid': `${uuid}` })
        const newBalance = account.balance + req.body.amount
        const balance_history = [...account.balance_history, newBalance]
        const remarks_history = [...account.remarks_history, req.body.remark]
        console.log(newBalance)
        res.send({
            'newBalance': newBalance,
            'balance_history': balance_history,
            'remarks_history':remarks_history
        })
    } catch (e) {
        res.send({
            'error': e,
            'message': 'Something went wrong!'
        })
    }
})


router.put(`/updateAccount/:uuid`, async (req, res) => {
    const uuid = req.params.uuid
    try {
        const setNewBalance = await AccountModel.updateOne({'uuid': `${uuid}`}, req.body )
        res.send(setNewBalance)
    } catch (e) {
        res.send({
            'error': e,
            'message': 'Something went wrong!'
        })
    }
})



module.exports = router