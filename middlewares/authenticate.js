const JWT = require('jsonwebtoken');
const config = require('../configs');
const userModel = require('../model/user.models')
module.exports = function (req, res, next) {
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']

    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']

    if (req.headers['token'])
        token = req.headers['token']

    if (req.query.token)
        token = req.query.token

    if (!token) {
        return next({
            msg: 'Authentication failed !! Token not received',
            status: 404
        })
    }

    //token verification
    JWT.verify(token, config.JWT_secret, function (err, decode) {
        if (err) {
            return next(err)
        }
        console.log('decoded messages >>', decode);
        userModel.findById(decode._id, function (err, done) {
            if (err) {
                return next(err);
            }
            if (!done) {
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            console.log('authenticate', done);
            req.user = done;
            next();

        })

    })
}


