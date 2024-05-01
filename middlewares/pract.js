// const express = require('express');

// const router = express.Router();


// router.get( function(req, res, next){
//     if(req.url === '/new')
//     {
//         next();
//     }
//     else
//     {
//         next('Failed process and data');
//     }
   
// })


module.exports = function(req, res, next){
    if(req.query.new)
    {
        // next();
        next();
        // res.send('asda');
     
        console.log('next')
    }
    else
    {
        console.log('nexasdt')
        next('Failed process and data');
    }
   
}