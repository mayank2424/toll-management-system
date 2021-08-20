// @ts-nocheck
/**
 * User Routes
 */
const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { isAdmin } = require('@middlewares/auth')
const { UserController, AuthController } = require('@controllers/index');

 /**
 * @dessription Get Current User route
 */
router.route('/currentUser')
    .get(UserController.getCurrentUser);


router.post('/add-user', 
    isAdmin, 
    AuthController.addUser
)

module.exports = router;
