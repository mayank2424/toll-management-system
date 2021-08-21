// @ts-nocheck
/**
 * User Routes
 */
const router = require('express').Router({
    caseSensitive : true,
    strict        : true,
});
const { isAdmin } = require('@middlewares/auth')
const { UserController } = require('@controllers/index');
const { checkError } = require('@helper/validation');
const { addUser, deleteUser } = require('@validators/user.validator');


 /**
 * @dessription Get Current User route
 */
router.route('/currentUser')
    .get(UserController.getCurrentUser);


router.post('/add', 
    isAdmin, 
    addUser,
    checkError,
    UserController.addUser
);

router.get('/list', 
    isAdmin, 
    UserController.listUsers
);

router.delete('/:userId', 
    isAdmin, 
    deleteUser,
    checkError,
    UserController.deleteUser
);

module.exports = router;
