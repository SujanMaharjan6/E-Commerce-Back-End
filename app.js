const server = require('express')

const app = server();

const path = require('path');
const cors = require('cors');
const pug = require('pug');

require('./db.js')
// const auth = require('./controller/auth.controller');
// const user = require('./controller/user.controller');
const API = require('./routes/api.route.js');


const a = require('./socket.js');
// require('./socket.js')(app);

a(app);


//event based communications
// const events =  require('events');
// const myEvents = new events.EventEmitter();
// app.use(function(req,res,next){
//     req.myEvent = myEvents;
    // res.json('sd')
    // next();
    // myEvents.on('err', function(data){
    //     console.log('this is error section ok', data);
    // })
// })

// myEvents.on('err',function(err, res){
//     console.log('here i am',err);
//     res.json(err);
// })


app.use(cors());
// const pract = require('./middlewares/pract');
// const pract1 = require('./middlewares/another');



const { urlencoded } = require('express');
app.use(urlencoded({
    extended: true
}))
app.use(server.json());
// app.set('view engine', pug);
// app.set('views', path.join(__dirname, 'views'));

app.use('/', API);

// app.use('/user', user);

// app.use('/image', server.static('images'));
// app.use('/image', server.static(path.join(__dirname, 'images')));

// app.use(function(req,res,next){
//     next({
//         message: 'Out of depth',
//         status: 404 
//     })
// })


app.use(function (err, req, res, next) {

    res.status(err.status || 400);
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })

    // res.send(err);


})



app.listen('9000', 'localhost', function (err, done) {
    if (err) {
        console.log('Failed to listen server');
    }
    else {
        console.log('Success to listen server');
        console.log('Press CTRL + C to exit');
    }
})