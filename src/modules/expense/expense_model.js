const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    date: { type: Date, required: true },
    details: { type: String, required: true },
    earning: { type: Number },
    expense: { type: Number },
    balance: { type: Number, required: true }
})

module.exports = model('Expense', expenseSchema, 'ExpenseCollection');