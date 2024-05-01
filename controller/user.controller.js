const express = require('express');

const router = express.Router();

const dbConfig = require('../configs/db.configs');
const { findOneAndUpdate } = require('../model/user.models.js');

const newUser = require('../model/user.models.js');
const mapUserReq = require('../util/map_user_req.js');
const Uploaded = require('./../middlewares/uploaders/upload.js');
// function connection(cb) {
//     dbConfig.MongoClient.connect(dbConfig.conxnURL, { useUnifiedTopology: true }, function (err, client) {
//         if (err) {
//             return cb(err);
//         }
//         const db = client.db(dbConfig.dbName);
//         cb(null, db);
//     })
// }
router.get('/', function (req, res, next) {
    console.log(req.body);
    // res.render('login.pug', {
    //     title: 'NEW'
    // })
    // connection(function (err, db) {
    //     if (err) {
    //         return next(err)
    //     }
    //     db.collection('user').find({}).toArray(function (err, done) {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.json(done);
    //     })
    // })


    // const New = new newUser({});
    // New.
    newUser.find({}).exec(function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'Not found',
                status: 404
            })
        }
        res.json(done);
    })

    // .catch(data)
    // {
    //    
    // }

})
router.post('/', function (req, res, next) {
    console.log('here dasdai am')
    // res.send('hi')
    // res.json({
    //     body: req.body
    // })
})

router.route('/:id')
    .get(function (req, res, next) {
        // connection(function (err, db) {
        //     if (err) {
        //         return next(err);
        //     }
        //     db.collection('user').find({ _id: new dbConfig.OId(req.params.id) }).toArray(function (err, done) {
        //         if (err) {
        //             return next(err);
        //         }
        //         res.json(done);
        //     })

        // })
        // newUser.find({_id: req.params.id}).exec(function(err, done){
            console.log('Update')
        newUser.findById(req.params.id).exec(function (err, done) {
            if (err) {
                return next(err);
            }
            if (!done) {
                return next({
                    msg: 'Not found',
                    status: 404
                })
            }
            res.json(done);
        })
    })
    // .post(function (req, res, next) {

    // })
    .put(Uploaded.single('Image'), function (req, res, next) {
        // connection(function (err, db) {
        //     if (err) {
        //         return next(err);
        //     }
        //     db.collection('user').updateOne({ _id: new dbConfig.OId(req.params.id) }, {$set:req.body}, function (err, updated) {
        //         if (err) {
        //             return next(err);
        //         }
        //         res.json(updated);
        //     })
        // })
        var data = req.body;
        if (req.fileError) {
            return next({
                msg: 'Error',
                status: 404
            })
        }

        if (req.file) {
            data.Image = req.file.filename;

        }

        newUser.findById(req.params.id).exec(function (err, done) {
            if (err) {
                return next(err);
            }
            if (!done) {
                return next({
                    msg: 'Not Found',
                    status: 404
                })
            }


            const user = mapUserReq(done, data);


            user.save(function (err, done) {
                if (err) {
                    return next(err);
                }
                if (!done) {
                    return next({
                        msg: 'Invalid Process',
                        status: 404
                    })
                }
                res.json(done)

            })
        })


    })


    .delete(function (req, res, next) {
        // connection(function (err, db) {
        //     if (err) {
        //         return next(err);
        //     }
        //     db.collection('user').remove({ _id: new dbConfig.OId(req.params.id) }, function (err, removed) {
        //         if (err) {
        //             return next(err)
        //         }
        //         res.json(removed);
        //     })
        // })

        newUser.findById(req.params.id, function (err, done) {
            if (err) {
                return next(err);
            }
            if (!done) {
                return next({
                    msg: "Not Found",
                    status: 404
                })
            }
            done.remove(function (err, done) {
                if (err) {
                    return next(err);
                }
                res.json(done);
            })
        })
    });

module.exports = router;