var express = require('express');
var router = express.Router();
const helper = require('../utils/helpers');
const endpoints = require('../utils/endpoints');

router.get('/', async function  (req, res, next)  {
    if(req.query.city === undefined || req.query.state === undefined) {
        res.send({
            message: 'Missing query parameter "city" or "state".'
        }) 
    } else {
        const url = `${endpoints.area_lookup.url}&state=${req.query.state}&city=${req.query.city.replace(' ', '-')}`;
        const result = await helper.send(req, res, 'GET', url);
        
        if(result){
            res.send(result);
        } else {
            res.send([])
        }
    }
});

module.exports = router;