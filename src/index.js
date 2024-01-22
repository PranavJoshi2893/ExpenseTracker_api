'use strict'
require('dotenv').config();

// spinning node server
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, HOST, () => {
    console.log(`[ready] http://${HOST}:${PORT}`)
})

// database config
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
main().then(() => console.log(`[connected] database connected`));
main().catch((err) => console.error(err));

//cors config
const cors = require('cors');
app.use(cors({
    "origin": "http://localhost:4200",
    "methods": "GET,HEAD,POST,PUT,PATCH,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}))

// endpoint connections
const user_route = require('./modules/user/user_route');
const expense_route = require('./modules/expense/expense_route');
app.use(express.json());
app.use('/api/v1', user_route);
app.use('/api/v1', expense_route)