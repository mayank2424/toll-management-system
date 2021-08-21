/**
 * All V1 routes land here
 */
const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});

const AuthRouter = require('../Auth');
const UserRouter = require('../user');
const ReceiptRouter = require('../receipts');
const VehiclesRouter = require('../vehicles');

//Middlewares
const { publicAuthMiddleware, isAdmin, isStaff } = require('@middlewares/auth');

router.get('/', (req, res) => res.status(200).json({
    status: 200,
    response: 'OK'
}))
router.use('/auth', AuthRouter);
router.use('/user', publicAuthMiddleware, UserRouter);
router.use('/receipts', publicAuthMiddleware, isStaff, ReceiptRouter);
router.use('/config', publicAuthMiddleware, isAdmin, [
    router.use('/vehicles', VehiclesRouter),
])

module.exports = router;