const { readTodo, writeTodo } = require('../services/file');
const uuid = require('uuid');

//=====================================================Imported Zone

//=====================================================GET Zone
const todosGet = async function (req, res, next) {
    const { title, completed, dueDate, offset, limit, sort } = req.query;
    const data = await readTodo();
    let clone = [...data]
    clone = title ? clone.filter(item => item.todos.title === title) : clone;
    clone = completed ? clone.filter(item => item.todos.completed === completed) : clone;
    clone = dueDate ? clone.filter(item => item.todos.dueDate === dueDate) : clone;
    clone = offset ? clone.slice(offset) : clone;
    clone = limit ? clone.slice(0, limit) : clone;
    clone = sort ? clone.sort((a, b) => { a > b ? 1 : -1 }) : clone;
    res.status(200).json(clone)
}

const todosGetID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldTodos = await readTodo();
        const todo = oldTodos.find(item => item.id === id) ?? null;
        res.json(todo);
    } catch (err) {
        res.status(500).json({ err: err.message })
    }

}
//=====================================================POST Zone
const todosPost = async (req, res, next) => {
    try {
        const { id, title, completed, dueDate = '1970-01-01' } = req.body
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'title is required' });
        }
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'completed must be a boolean' });
        }
        if (dueDate !== undefined && isNaN(new Date(dueDate).getTime())) {
            return res.status(400).json({ message: 'invalid due date' });
        }

        const newTodo = { id: uuid.v4(), title, completed, dueDate }
        const oldTodos = await readTodo();
        oldTodos.unshift(newTodo);
        await writeTodo(oldTodos)
        res.status(201).json({ "newData": newTodo })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}
//=====================================================PUT Zone
const todosPut = async (req, res, next) => {
    try {
        const { title, completed, dueDate } = req.body;
        const { id } = req.params;
        const oldTodos = await readTodo();
        const newTodo = { id, title, completed, dueDate };
        const mewTodos = oldTodos.map(item => (item.id === id ? newTodo : item))
        await writeTodo(mewTodos)
        res.status(200).json({ update: newTodo })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }

}
//=====================================================DELETE Zone
const todosDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const oldTodos = await readTodo();
        const newTodos = oldTodos.filter(item => item.id !== id)
        await writeTodo(newTodos)
        res.status(200).json({ message: 'Success delete' })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
//=====================================================Exported Zone
module.exports = { todosGet, todosGetID, todosPost, todosPut, todosDelete };
