const { readFile, writeFile } = require('fs/promises');
exports.readExpense = () => readFile('db/transection.json', 'utf-8').then((result) => JSON.parse(result));
exports.writeExpense = data => writeFile('db/transection.json', JSON.stringify(data), 'utf-8');