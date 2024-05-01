const router = require('express').Router();



const auth = require('../controller/auth.controller.js');
const user = require('../controller/user.controller.js');
const item = require('../components/items/item.router.js');
const authenticate = require('../middlewares/authenticate.js');

router.use('/admin', auth);
router.use('/user',authenticate, user);
router.use('/item',authenticate, item);

module.exports = router;