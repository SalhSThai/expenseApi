//=====================================================Imported Zone
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const errFn = require('./middleweres/error');
const notFound = require('./middleweres/notFound')
const todosRoutes = require('./routes/todoRoute')
//=====================================================Imported Zone
//=====================================================constance & local imported Zone
const app = express();

const PORT = 9000;
//=====================================================constance & local imported Zone
//=====================================================Encoding Zone
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//=====================================================Encoding Zone
//=====================================================Express Zone
app.use('/todos',todosRoutes)
//=====================================================Express Zone
//=====================================================Throwing Zone
app.use(notFound);
app.use(errFn);
//=====================================================Listening Zone
app.listen(PORT,()=>{console.log(`PORT:[${PORT}] Server is running...`);});