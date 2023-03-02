var express = require('express');
var router = express.Router();
const helper = require('../utils/helpers');
const endpoints = require('../utils/endpoints');
const config = require('../config');

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
            property.map_url =`https://www.google.com/maps/embed/v1/place?key=${config.google_map_key}&q=${property.latitude},${property.longitude}&zoom=18&maptype=satellite`;
        });
        res.send(result.properties);
    }
})



module.exports = router; 