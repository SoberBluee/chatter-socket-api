var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ping', (request, response, next) =>{
    return response.json({
        data: 'ping data from chatter-socket-api'
    })
})

module.exports = router;
