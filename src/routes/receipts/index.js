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
const { addReceipt, getSingleReceipt, deleteReceipt } = require('@validators/receipts.validator');



//All Route methods

 /**
 * @desscription Create new receipt
 */
router.post('/add',
    addReceipt,
    checkError,
    ReceiptsController.createNewReceipt);

/** Get All paginates receipts */
router.get('/list', 
    ReceiptsController.getAllReceipts
);

/**
 * Get Single Receipt Details
 */
router.get('/', 
    getSingleReceipt,
    checkError,
    ReceiptsController.checkReceipt
);

/**
 * @description Delete single receipt
 */
router.delete('/:id', 
    deleteReceipt,
    checkError,
    ReceiptController.deleteReceipt
);


module.exports = router;

