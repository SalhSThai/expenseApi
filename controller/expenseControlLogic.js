const { readExpense, writeExpense } = require('../services/fileExpense');
const uuid = require('uuid');

//=====================================================Imported Zone

//=====================================================GET Zone
const expenseGet = async function (req, res, next) {

    try {
        const { payee, amount, date, offset, limit, sort } = req.query;
        const data = await readExpense();
        let clone = [...data]
        clone = payee ? clone.filter(item => item.todos.title === title) : clone;
        clone = amount ? clone.filter(item => item.todos.completed === completed) : clone;
        clone = date ? clone.filter(item => item.todos.dueDate === dueDate) : clone;
        clone = offset ? clone.slice(offset) : clone;
        clone = limit ? clone.slice(0, limit) : clone;
        clone = sort ? clone.sort((a, b) => { a.payee > b.payee ? 1 : -1 }) : clone;
        res.status(200).json(clone)
        
    } catch (err) {
        next(err);
    }

}

const expenseGetID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldExpense = await readExpense();
        const expense = oldExpense.find(item => item.id === id) ?? null;
        res.json(expense);

    } catch (err) {
        next(err);
    }

}
//=====================================================POST Zone
const expensePost = async (req, res, next) => {
    try {
        const { id, payee, amount, date = '1970-01-01',categoryId } = req.body
        if (!payee || !payee.trim()) {
            return res.status(400).json({ message: 'title is required' });
        }
        if (typeof amount !== 'number') {
            return res.status(400).json({ message: 'completed must be a number' });
        }
        if (date !== undefined && isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: 'invalid due date' });
        }

        const newExpense = { id: uuid.v4(), payee, amount, date,categoryId }
        const oldExpense = await readExpense();
        oldExpense.unshift(newExpense);
        await writeExpense(oldExpense)
        res.status(201).json({ "newData": newExpense })

    } catch (err) {
        next(err);
    }


}
//=====================================================PUT Zone
const expensePut = async (req, res, next) => {
    try {
        const { payee, amount, date,categoryId } = req.body;
        const { id } = req.params;
        const oldExpense = await readExpense();
        const newExpense = { id, payee, amount, date,categoryId };
        const mewExpense = oldExpense.map(item => (item.id === id ? newExpense : item))
        await writeExpense(mewExpense)
        res.status(200).json({ update: newExpense })
        
    } catch (err) {
        next(err);
    }

}
//=====================================================DELETE Zone
const expenseDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const oldExpense = await readExpense();
        const newExpense = oldExpense.filter(item => item.id !== id)
        await writeExpense(newExpense)
        res.status(200).json({ message: 'Success delete' })

    } catch (err) {
        next(err);
    }
}
//=====================================================Exported Zone
module.exports = { expenseGet, expenseGetID, expensePost, expensePut, expenseDelete };
