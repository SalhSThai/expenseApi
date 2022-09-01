const { readFile, writeFile } = require('fs/promises');
exports.readCat = () => readFile('db/category.json', 'utf-8').then((result) => JSON.parse(result));
exports.writeCat = data => writeFile('db/category.json', JSON.stringify(data), 'utf-8');