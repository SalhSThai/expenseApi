const { expenseGet, expenseGetID, expensePost, expensePut, expenseDelete } = require('../controller/expenseControlLogic')

const express = require('express')

const expenseRoute = express.Router();
expenseRoute.get('/',expenseGet)
expenseRoute.get('/:id',expenseGetID)
expenseRoute.post('/',expensePost)
expenseRoute.put('/:id',expensePut)
expenseRoute.delete('/:id',expenseDelete)

module.exports = expenseRoute;
