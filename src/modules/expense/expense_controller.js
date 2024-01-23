const Expense = require('./expense_model');

async function addExpense(req, res) {
    try {
        const tempBalance = await Expense.findOne({}).sort({ _id: -1 });
        if (tempBalance === null) {
            const newExpense = new Expense({
                date: req.body.date,
                details: req.body.details,
                expense: req.body.expense,
                balance: 0 - Number(req.body.expense)
            });
            await newExpense.save();
            return res.status(201).json({ message: "New expense added" });
        }

        const newExpense = new Expense({
            date: req.body.date,
            details: req.body.details,
            expense: req.body.expense,
            balance: Number(tempBalance.balance) - Number(req.body.expense)
        });

        await newExpense.save();
        return res.status(201).json({ message: "New expense added" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function addEarning(req, res) {
    try {
        const tempBalance = await Expense.findOne({}).sort({ _id: -1 });
        if (tempBalance === null) {
            const newExpense = new Expense({
                date: req.body.date,
                details: req.body.details,
                earning: req.body.earning,
                balance: 0 + Number(req.body.earning)
            });
            await newExpense.save();
            return res.status(201).json({ message: "New expense added" });
        }

        const newExpense = new Expense({
            date: req.body.date,
            details: req.body.details,
            earning: req.body.earning,
            balance: Number(tempBalance.balance) + Number(req.body.earning)
        });
        await newExpense.save();
        return res.status(201).json({ message: "New earning added" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateData(req, res) {
    try {
        const id = req.params.id;
        await Expense.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json({ message: "Data Updated" })
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
    updateData,
    deleteEntry,
    getAllData
}