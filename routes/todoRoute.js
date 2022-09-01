const  { todosGet, todosGetID, todosPost, todosPut, todosDelete } = require('../controller/todosControlLogic')

const express = require('express')

const todosRoutes = express.Router();
todosRoutes.get('/',todosGet)
todosRoutes.get('/:id',todosGetID)
todosRoutes.post('/',todosPost)
todosRoutes.put('/:id',todosPut)
todosRoutes.delete('/:id',todosDelete)

module.exports = todosRoutes;
