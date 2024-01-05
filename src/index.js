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