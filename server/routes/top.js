var express = require('express');
var router = express.Router();
const helper = require('../utils/helpers');
const endpoints = require('../utils/endpoints');

router.get('/', async function  (req, res, next)  {
    if(req.query.city_id === undefined) {
        res.send({
            message: 'Missing query parameter "city_id".'
        }) 
    } else {
        const url = `${endpoints.top.url}&market_id=${req.query.city_id}`;
        const result = await helper.send(req, res, 'GET', url);
        
        if(result){
            res.send(result.payload.property_managers);
        } else {
            res.send([])
        }
    }
});

module.exports = router;