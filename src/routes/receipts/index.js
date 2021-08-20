/**
 * Toll Receipt Routes
 */
 const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { ReceiptsController } = require('@controllers/index');
const ReceiptController = require('@controllers/receipt');
const { checkError } = require('@helper/validation');


//All Route methods

 /**
 * @desscription Create new receipt
 */
router.post('/add',
    ReceiptsController.createNewReceipt);

/** Get All paginates receipts */
router.get('/list', ReceiptsController.getAllReceipts);

/**
 * Get Single Receipt Details
 */
router.get('/receipt', ReceiptsController.checkReceipt);

/**
 * @description Delete single receipt
 */
router.delete('/delete/:id', ReceiptController.deleteReceipt);


module.exports = router;

