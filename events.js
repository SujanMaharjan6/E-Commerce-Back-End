const event  = require('events');

const eventTrigger = new event.EventEmitter();





eventTrigger.on('nepal',function(data){
    console.log('event triggered', data);
});

eventTrigger.emit('nepal','hi')
// setTimeout(function(){
//     eventTrigger.emit('nepal','hi')
// },400)