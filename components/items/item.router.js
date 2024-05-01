const express = require('express');

const router = express.Router();
const ItemCtrl = require('./item.controller');
const Uploaded = require('./../../middlewares/uploaders/upload.js')
// module.exports = function () {
router.route('/')
    // .get(authenticate, ItemCtrl.get)
    // .post(authenticate, ItemCtrl.post)
    .get(ItemCtrl.get)
    .post( Uploaded.array('images'), ItemCtrl.post)


router.route('/search')
    // .get(authenticate, ItemCtrl.search)
    // .post(authenticate, ItemCtrl.search)
    .get(ItemCtrl.search)
    .post(ItemCtrl.search)

router.route('/addrating/:item_id')
    // .post(authenticate, ItemCtrl.addRatings)
    .post(ItemCtrl.addRatings)


router.route('/:id')
    // .get(authenticate, ItemCtrl.getById)
    // .put(authenticate, ItemCtrl.update)
    // .delete(authenticate, ItemCtrl.remove)
    .get(ItemCtrl.getById)
    .put(Uploaded.single('images'),ItemCtrl.update)
    .delete(ItemCtrl.remove)

// return router;

// }

module.exports = router;