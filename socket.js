const socket = require('socket.io');
// const app = require('./app.js');



module.exports = function (app) {
    const ion = socket(app.listen(9001), {
        cors: {
            allow: '/*'
        }
    });
    ion.on('connection', function (client) {
        console.log('Socket connected to client server');
        client.emit('hello', 'welcome to chat');
        client.on('hi', function(data){
            console.log('ok this is it', data);
        })
      
    })
   


}
// module.exports = function (){
// const io = socket(app.listen(9001), {
//     cors: {
//         allow: '/*'
//     }
// })
// io.on('connection', function (client) {
//     console.log('Socket connected to client server');
// })
// }