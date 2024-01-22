const router = require('express').Router();
const { addExpense, addEarning, deleteEntry, getAllData } = require('./expense_controller');


router
    .route('/expense')
    .post(addExpense)

router
    .route('/earning')
    .post(addEarning)

router
    .route('/delete/:id')
    .delete(deleteEntry)

router
    .route('/getAll')
    .get(getAllData)

module.exports = router;