const express = require('express');
const router = express.Router();
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const dbName = 'something';
// const conxnURL = 'mongodb://127.0.0.1:27017';
const multer = require('multer');
const path = require('path');
const UserModel = require('../model/user.models');
const fs = require('fs');
const passwordHash = require('password-hash');
const mapUserReq = require('../util/map_user_req.js');
const { error } = require('console');
const jwt = require('jsonwebtoken');
const Uploaded = require('./../middlewares/uploaders/upload.js');
const config = require('./../configs');
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'student98511@gmail.com',
        pass: 'password'
    }
});



function info(email) {
    console.log('inside', email)
    console.log('inside all', email.Email)
    return infos = {
        from: '"Fred Foo 👻" <student98511@gmail.com>',
        to:'student985111@gmail.com,'+ email.Email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<p>${email.Name}</p>
        <p><a href="${email.link}">click here to reset</a></p>`,
    }

}


function createToken(data) {
    var token = jwt.sign({
        _id: data.id,
        role: data.role,
        name: data.username,

    }, config.JWT_secret);
    return token;
}
// const filter = function (req, file, cb) {
//     var MimeType1 = file.mimetype.split('/')[0];

//     if (MimeType1 === 'image') {
//         cb(null, true)
//     }
//     else {
//         req.fileTypeError = true
//         cb(null, false)
//     }

// }


// const myStorage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
//     destination: function (res, file, cb) {
//         cb(null, path.join(process.cwd(), 'uploads/images'))
//     }

// })
// const upload = multer({
//     storage: myStorage,
//     fileFilter: filter
// })

router.route('/forgot')
    .post(function (req, res, next) {
        console.log('hereforget >>', req.body);
        condition = {};
        condition.Email = req.body.email
        console.log('asdasd', condition)
        // if(passwordResetTokenExpiry > Date.now())
        // {
            UserModel.findOne(condition, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next({
                        msg: 'Email Id Not found',
                        status: '402'
                    })
                }

        
   
            const passwordResetToken = require('randomstring').generate(22);
            const passwordResetTokenExpiry = Date.now() + (1000*60*60*24*2);

            user.passwordResetToken = passwordResetToken;
            user.passwordResetTokenExpiry = passwordResetTokenExpiry;
            user.link = `http://localhost:3000/reset/${passwordResetToken}`;
            console.log('expiry',user.passwordResetToken )
            user.save(function(err, done){
                if(err)
                {
                   return next(err);
                }
               
                transporter.sendMail(info(user), function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    console.log('sent');
    
                    res.json(user);
                })


            })
            // res.json(done);
            // console.log('asdsadasdsadadasdsad',done)
        


        })
    // }

    })






router.post('/login', function (req, res, next) {
    console.log('asdd', req.body);
    // MongoClient.connect(conxnURL, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
    //     if (err) {
    //         return next(err);
    //     }

    // const db = client.db(dbName);
    // db.collection('user').find({}).toArray(function (err, done) {
    //     // console.log('rer', err);
    //     if (err) {

    //         return next(err);
    //     }
    //     res.json(done);

    // })



    // })

    const NewUser = UserModel.findOne({ 
        $or:[
            {Username: req.body.Username},
            {Email: req.body.Username}
        ]
     }).exec(function (err, done) {
        console.log('User', done);
        if (err) {
            next({
                msg: 'Invalid User',
                status: 404
            });
        }
        else {
            if (!done) {
                return next({
                    msg: 'Invalid User',
                    status: 404
                })
            }

            if (done.Status === 'Offline') {
                return next({
                    msg: 'Your account is disable please contact the administration',
                    status: 404
                })
            }
            // res.json(done.Gender)
            var isMatched = passwordHash.verify(req.body.Password, done.Password);
            console.log('asdadasd >>', isMatched);
            if (isMatched) {
                //tokem generate

                var authToken = createToken(done);
                res.json({
                    user: done,
                    token: authToken
                });
            }
            else {
                next({
                    msg: 'Invalid password',
                    status: 404
                })

            }


        }
    })


})

router.route('/register')
    .get(function (req, res, next) {
        // console.log('asdadasd');
        // res.send('from register')

    })
    .post(Uploaded.single('Image'), function (req, res, next) {
        console.log('body >>', req.body);
        console.log(req.file);
        // MongoClient.connect(conxnURL, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
        //     if (err) {
        //         return next(err);
        //     }
        //     const db = client.db(dbName);
        //     db.collection('user').insertOne(req.body, function (err, done) {
        //         if (err) {
        //             return next(err);
        //         }
        //         res.status(200);
        //         res.json(done);
        //     })

        // })

        const data = req.body;
        //by the way of mongoose
        if (req.fileTypeError) {
            return next({
                msg: 'Error',
                status: 404
            })
        }



        if (req.file) {
            data.Image = req.file.filename;

            //    const file = req.file.mimetype.split('/')[0];
            //    if(file !== 'image')
            //    {
            //     fs.unlink( req.file.filename, function(err, done){
            //         if(err)
            //         {
            //             console.log('false');
            //         }
            //         else
            //         {
            //             console.log('removed')
            //         }
            //     })
            //     return next({
            //         msg: 'Error',
            //         status: 404
            //     })
            //    }
        }

        const NewUser = new UserModel({});
        console.log('successas');
        const neww = mapUserReq(NewUser, data)
        neww.Password = passwordHash.generate(req.body.Password);
        console.log('succesasdsas');
        neww.save(function (err, done) {
            if (err) {
                // console.log('adasd',err);
                next(err);
            }
            else {
                res.json({
                    msg: done
                })
                console.log('success');
            }
        })


    })

// router.route('/Pass')
// .get(function(req,res,next){
//     console.log('asdadasd');
//     res.json({
//         message: 'Welcome to Pass'
//     })
// })




//for event based communications
// router.get('/a', function(req,res,next){
//     console.log('hereasd');
//     require('fs').readFile('asdasd.asd', function(err, done){
//         if(err)
//         {
//             console.log('hereasdasdada');
//           req.myEvent.emit('err', err, res);
//         }
//     })
// })



router.post('/reset/:id', function (req, res, next) {
    console.log('in reset', req.params.id);
    //    res.json('sad')
   
    UserModel.findOne( {passwordResetToken: req.params.id
        // ,
    
    // passwordResetToken:{
    //     $gt: Date.now()
    // }
    }, function (err, done) {
        if (err) {
            return next(err);
        }
        if (!done) {
            return next({
                msg: 'User Not found Password cannot be reset',
                status: 404
            })
        }
        if(done.passwordResetTokenExpiry < Date.now())
        {
            return next({
                msg: 'Session Expired',
                status: 404
            })
        }
        done.Password =  passwordHash.generate(req.body.password);
        done.passwordResetTokenExpiry = null;
        done.passwordResetToken =null;
        done.save(function (err, done) {
            if (err) {
                next(err)
            }
            if (!done) {
                next({
                    msg: 'Passowrd reset failed sorry',
                    status: 400
                })
            }
            res.json('Password Successfully changed');
        })
    })


    //     const User = new UserModel({});
    //     User.Password = req.body.password;
    //     User.save(function(err,done){
    //         if(err)
    //         {
    //             return next(err);
    //         }
    //         console.log('passs>>', User.Password);
    //         res.json(done);
    //     })
})

module.exports = router;
