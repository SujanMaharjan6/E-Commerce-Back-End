const ItemModel = require("./item.module");
const Item_map = require('./../../util/map_item_req');

// const ItemModels = require('./item.module.js');


function get(req, res, next) {
    // const condition = {
    //     vendor: req.user._id
    // };
    console.log('i am here')
    const condition = {};
    condition.vendor = req.user._id;
    ItemModel.find(condition).populate('vendor', { Username: 1, Email: 1 }).exec(function (err, done) {
        if (err) {
            return next(err);
        }
        res.json(done);
    })

}
function getById(req, res, next) {

    ItemModel.findById(req.params.id).exec(function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Find by Id Empty',
                status: 404
            })
        }
        res.json(done);
    })

}
function post(req, res, next) {
    console.log('warrenty', req.body)
    console.log('image', req.file)
    console.log('image', req.files)
    const data = req.body;
    if (req.file) {
        data.images = req.file.filename;
    }
    if (req.files) {
        data.images = req.files.map(data => {
            return data.filename;
        })
    }
    const NewItem = new ItemModel({});

    data.vendor = req.user._id;
    const Item = Item_map(NewItem, data);

    NewItem.save(function (err, done) {
        console.log('i am here', Item)
        if (err) {
            return next({
                msg: 'Saved Failed',
                status: 403
            });
        }
        res.json(done);
    })

}

function update(req, res, next) {
    console.log('here update', req.params.id);
    ItemModel.findById(req.params.id).exec(function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Find by Id Empty',
                status: 404
            })
        }
        console.log('here update done', done);
        const data = req.body;
        if (req.file) {
            data.images = req.file.filename;
        }

        if (req.files) {
            data.images = req.files.map(data => {
                return data.filename;
            })
        }
        const item = Item_map(done, data);
        console.log('saveed', item);
        // const NewItem = new ItemModel({});
        item.save(function (err, done) {
            console.log('i am here', err)
            if (err) {
                return next({
                    msg: 'Saved Failed',
                    status: 403
                });
            }
            res.json(done);
        })

    })
}
function remove(req, res, next) {

    if (req.user.Role !== 1) {
        next({
            msg: "You are not admin",
            status: 403
        })
    }
    console.log('i am delete here ok');
    ItemModel.findById(req.params.id, function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Cannot delete user not found',
                status: 404
            })
        }
        done.remove(function (err, done) {
            if (err) {
                return next(err);
            }
            res.json('Item Removed');
        })
    })
}
function search(req, res, next) {
    // let data = req.body;
    // console.log('sadasd',req.method)
    // const data = req.method === 'POST' ? req.body : req.query;
    const data = req.body;
    const condition = {};
    console.log('sadasd', req.body)
    if (req.body.minPrice) {
        condition.price = {
            $gte: req.body.minPrice
        }
    }

    if (req.body.maxPrice) {
        condition.price = {
            $lte: req.body.maxPrice
        }
    }

    if (req.body.minPrice && req.body.maxPrice) {
        condition.price = {
            $gte: req.body.minPrice,
            $lte: req.body.maxPrice

        }
    }
    if (req.body.fromDate && req.body.toDate) {
        const fromDate = new Date(req.body.fromDate).setHours(0, 0, 0, 0);
        const toDate = new Date(req.body.toDate).setHours(23, 59, 59, 999);
        condition.createdAt = {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
        }
    }
    if(req.body.tags)
    {
        condition.tags = {
            $in: req.body.tags.split(',')
        }
    }

    console.log('condition >>', condition);

    Item_map(condition, data);
    console.log('asda',condition.tags);
    ItemModel.find(condition).populate('ratings.user', { Username: 1, Email: 1 }).exec(function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Cannot search',
                status: 404
            })
        }
        res.json(done);
    })

}
function addRatings(req, res, next) {
    ItemModel.findById(req.params.item_id, function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Cannot delete user not found',
                status: 404
            })
        }
        if (req.body.ratingMessage && req.body.ratingPoint) {
            let ratingBody = {
                message: req.body.ratingMessage,
                point: req.body.ratingPoint,
                user: req.user._id
            }
            done.ratings.push(ratingBody);
            done.save(function (err, done) {
                if (err) {
                    return next(err);
                }
                if (!done) {
                    next({
                        msg: 'Adding Rating Failed.  Messages and point is required',
                        status: 400
                    })
                }
                res.json(done);


            })

        }


    })
}

module.exports = {
    get,
    getById,
    post,
    update,
    remove,
    search,
    addRatings

}