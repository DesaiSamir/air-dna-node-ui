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
        const url = `${endpoints.overview.url}&city_id=${req.query.city_id}&region_type=all&neighbor_cities=true`;
        const result = await helper.send(req, res, 'GET', url);
        
        if(result){
            res.send(result);
        } else {
            res.send([])
        }
    }
});

module.exports = router;