const router = require('express').Router();
const { addExpenseOrEarning, updateData, deleteEntry, getAllData } = require('./expense_controller');


router
    .route('/expense')
    .post(addExpenseOrEarning)

router
    .route('/update/:id')
    .patch(updateData)

router
    .route('/delete/:id')
    .delete(deleteEntry)

router
    .route('/getAll')
    .get(getAllData)

module.exports = router;