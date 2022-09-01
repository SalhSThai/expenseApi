//=====================================================Imported Zone
const express = require('express');
const cors = require('cors');
const errFn = require('./middleweres/error');
const notFound = require('./middleweres/notFound')
const expenseRoute = require('./routes/expenseRoute')

const categoryRoute = require('./routes/categoryRoute')
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
app.use('/transection',expenseRoute)
app.use('/category',categoryRoute)
//=====================================================Express Zone
//=====================================================Throwing Zone
app.use(notFound);
app.use(errFn);
//=====================================================Listening Zone
app.listen(PORT,()=>{console.log(`PORT:[${PORT}] Server is running...`);});