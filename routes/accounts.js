module.exports = {
    getAccounts(req, res) {
        req.account.find({}, (err, accounts, next) => {
            console.log(accounts)
            if (err) return next(err)
            res.status(200).send(accounts)
        });
    },
    createAccount(req, res, next) {
        let newAccount = req.body
        var account = new req.account(newAccount)
        account.save((err) => {
            if (err) return next(err)
            console.log('The account is saved: ', account.toJSON())
            res.status(201).send({
                id: account._id
            })
        })
    },
    updateAccount(req, res, next) {
        req.account.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, (err, accountUpdated) => {
            console.log(err, accountUpdated)
            if (err || accountUpdated==null) return next(err)
            console.log('The account is saved: ', accountUpdated)
            res.status(200).send(accountUpdated)
        })
    },
    removeAccount(req, res, next) {
        console.log(req.body)
        req.account.findByIdAndRemove(req.params.id, (err, account) => {
            console.log(err, account)
            if (err || account == null) return next(err)
            let response = {
                message: "Account successfully deleted",
                id: account._id
            };
            res.status(201).send(response)
        });
    }
}