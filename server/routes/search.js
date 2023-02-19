var express = require('express');
var router = express.Router();
const helper = require('../utils/helpers');
const endpoints = require('../utils/endpoints');

router.get('/', async function  (req, res, next)  {
    if(req.query.term === undefined) {
        res.send({
            message: 'Missing query parameter "term".'
        }) 
    } else {
        const url = `${endpoints.search.url}&term=${req.query.term}`;
        const result = await helper.send(req, res, 'GET', url);
        
        if(result){
            res.send(result);
        } else {
            res.send([])
        }
    }
});

module.exports = router;