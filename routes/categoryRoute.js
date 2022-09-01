const { categoryGet, categoryGetID, categoryPost, categoryPut, categoryDelete } = require('../controller/categoryControlLogic')

const express = require('express')

const categoryRoute = express.Router();
categoryRoute.get('/',categoryGet)
categoryRoute.get('/:id',categoryGetID)
categoryRoute.post('/',categoryPost)
categoryRoute.put('/:id',categoryPut)
categoryRoute.delete('/:id',categoryDelete)

module.exports = categoryRoute;
