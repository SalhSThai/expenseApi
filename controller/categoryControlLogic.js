const { readCat, writeCat } = require('../services/fileCatagory');
const uuid = require('uuid');

//=====================================================Imported Zone

//=====================================================GET Zone
const categoryGet = async function (req, res, next) {

    try {
        const { title, type, offset, limit, sort } = req.query;
        const data = await readCat();
        let clone = [...data]
        clone = title ? clone.filter(item => item.todos.title === title) : clone;
        clone = type ? clone.filter(item => item.todos.completed === completed) : clone;
        clone = offset ? clone.slice(offset) : clone;
        clone = limit ? clone.slice(0, limit) : clone;
        clone = sort ? clone.sort((a, b) => { a.title > b.title ? 1 : -1 }) : clone;
        res.status(200).json(clone)
        
    } catch (err) {
        next(err);
    }

}

const categoryGetID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldCats = await readCat();
        const cats = oldCats.find(item => item.id === id) ?? null;
        res.json(cats);

    } catch (err) {
        next(err);
    }

}
//=====================================================POST Zone
const categoryPost = async (req, res, next) => {
    try {
        const { id, title, type } = req.body
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'title is required' });
        }
        if (!type || !type.trim()) {
            return res.status(400).json({ message: 'type is required' });
        }

        const newCat = { id: uuid.v4(), title, type }
        const oldCat = await readCat();
        oldCat.unshift(newCat);
        await writeCat(oldCat)
        res.status(201).json({ "newData": newCat })

    } catch (err) {
        next(err);
    }


}
//=====================================================PUT Zone
const categoryPut = async (req, res, next) => {
    try {
        const { title, type } = req.body;
        const { id } = req.params;
        const oldCats = await readCat();
        const newCats = { id, title, type };
        const mewCats = oldCats.map(item => (item.id === id ? newCats : item))
        await writeCat(mewCats)
        res.status(200).json({ update: newCats })
        
    } catch (err) {
        next(err);
    }

}
//=====================================================DELETE Zone
const categoryDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const oldCats = await readCat();
        const newCats = oldCats.filter(item => item.id !== id)
        await writeCat(newCats)
        res.status(200).json({ message: 'Success delete' })

    } catch (err) {
        next(err);
    }
}
//=====================================================Exported Zone
module.exports = { categoryGet, categoryGetID, categoryPost, categoryPut, categoryDelete };
