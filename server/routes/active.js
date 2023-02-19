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
        const dt = new Date();
        const thisMonth = `&start_month=${dt.getMonth() + 1}`;
        const start_year = `&start_year=${new Date(dt.setMonth(-36)).getFullYear()}`;
        const city_id = `&city_id=${req.query.city_id}`;
        const accommodates = (req.query.accommodates !== undefined) ? `&accommodates=${req.query.accommodates}` : '';
        const bedrooms = (req.query.bedrooms !== undefined) ? `&bedrooms=${req.query.bedrooms}` : '';
        const propertyTypes = (req.query.property_types !== undefined) ? `&property_types=${req.query.property_types}` : '';

        const url = `${endpoints.active.url}${city_id}${thisMonth}${start_year}${accommodates}${bedrooms}${propertyTypes}`;
        const result = await helper.send(req, res, 'GET', url);
        
        if(result){
            res.send(result);
        } else {
            res.send([])
        }
    }
});
module.exports = router;