const Expense = require('./expense_model');

async function addExpense(req, res) {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        return res.status(201).json({ message: "New expense added" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function addEarning(req, res) {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        return res.status(201).json({ message: "New earning added" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteEntry(req, res) {
    try {
        const id = req.params.id;
        await Expense.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Value deleted successfully" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllData(req, res) {
    try {
        const data = await Expense.find();
        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    addExpense,
    addEarning,
    deleteEntry,
    getAllData
}