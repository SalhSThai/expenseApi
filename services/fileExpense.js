const { readFile, writeFile } = require('fs/promises');
exports.readTodo = () => readFile('db/transection.json', 'utf-8').then((result) => JSON.parse(result));
exports.writeTodo = data => writeFile('db/transection.json', JSON.stringify(data), 'utf-8');