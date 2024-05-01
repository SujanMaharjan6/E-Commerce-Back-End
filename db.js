const mongoose = require('mongoose');
const dbConfig = require('./configs/db.configs.js');
const conxnURL = dbConfig.conxnURL + '/' + dbConfig.dbName;
//mongo://localhost:27071/something<database name>


mongoose.connect(conxnURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
// , function (err, db) {
//     if (err) {
//         console.log('Mongoose connection failed');
//     }
//     else {
//         console.log('Mongoose connection success');
//     }
// }
)


mongoose.connection.once('open', function(){
    console.log('connection success');
})

mongoose.connection.on('err', function(){
    console.log('connection failed');
})