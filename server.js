const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const routes = require('./routes')
let app = express()
app.use(logger('dev'))
let portNum = 3000
mongoose.connect('mongodb://localhost:27017/BKaccounts', {
    useNewUrlParser: true
})
const Account = mongoose.model('Account', {
    name: String,
    balance: Number
})
app.use(bodyParser.json())
app.use((req, res, next) => {
    req.account = Account
    next()
})
app.get('/accounts', routes.accounts.getAccounts)
app.post('/accounts', routes.accounts.createAccount)
app.put('/accounts/:id', routes.accounts.updateAccount)
app.delete('/accounts/:id', routes.accounts.removeAccount)
//app.use(errorhandler())
app.listen(portNum)
console.log('server is at http://localhost:' + portNum)
