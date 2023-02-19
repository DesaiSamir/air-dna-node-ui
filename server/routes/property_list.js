var express = require('express');
var router = express.Router();
const helper = require('../utils/helpers');
const endpoints = require('../utils/endpoints');

router.post('/', async function (req, res, next)  {

    const method = 'POST';
    const url = endpoints.property_list.url;
    const payload = req.body;
    const result = await helper.send(req, res, method, url, payload);
    
    if(result){
        result.properties.forEach(property => {
            // Update the revenue property by multiplying adr and days_available
            let days_available = Math.round(property.days_available * 0.5);
            let adr = Math.round(property.adr * 0.8);
            property.revenue = adr * days_available;
            property.occ = ((days_available / 365) * 100).toFixed(2);
        });
        res.send(result.properties);
    }
})



module.exports = router; 