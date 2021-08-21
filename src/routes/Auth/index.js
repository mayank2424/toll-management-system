/**
 * Auth Routes
 */
const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { AuthController } = require('@controllers/index');
const { checkError } = require('@helper/validation');
const { validateSignInRequest } = require('@validators/auth.validator');
const { isAdmin, publicAuthMiddleware } = require('@middlewares/auth')

//All Route methods
 /**
 * @desscription Main Login Route
 */
router.post('/signin',
    validateSignInRequest,
    checkError,
    AuthController.signIn
);


module.exports = router;

