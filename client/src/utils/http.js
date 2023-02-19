// var h = require('./helper');

module.exports = {
    getActiveListings: async function(city_id, cb){
        const result = await this.get(`api/active?city_id=${city_id}`, cb);
        
        if(result){
            cb(result);
        }
    },
    getAreaInfo: async function(city_id, cb) {
        const result = await this.get(`api/area_info?city_id=${city_id}`, cb);

        if(result){
            cb(result);
        }
    },
    getAreaLookup: async function(state, city_name, cb){
        const result = await this.get(`api/area_lookup?state=${state.toLowerCase()}&city=${city_name.toLowerCase()}`);
        
        if(result){
            cb(result);
        }
    },
    getOverview: async function(city_id, cb){
        const result = await this.get(`api/overview?city_id=${city_id}`);

        if(result){
            cb(result);
        }
    },
    getPropertyList: async function(payload, cb){
        // Payload Sample
        // {
        //     "currency": "USD",
        //     "filters": [
        //         {
        //         "type": "select",
        //         "field": "zipcode", // type could be city_id or zipcode
        //         "value": 19438
        //         }]
        // }
        const result = await this.send('POST','api/property_list', payload);

        if(result){
            cb(result);
        }
    },
    getPropertyMetrics: async function(city_id, cb){
        const result = await this.get(`api/property_metrics?city_id=${city_id}`);

        if(result){
            cb(result);
        }
    },
    getSearch: async function(city_name, cb){
        const result = await this.get(`api/search?term=${city_name}`);

        if(result){
            cb(result);
        }
    },
    getTopPropertyManagers: async function(city_id, cb){
        const result = await this.get(`api/top?city_id=${city_id}`);

        if(result){
            cb(result);
        }
    },
    send: async function (method, url, payload = null) {
        // console.log({method, url, payload});
        var options = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: payload && JSON.stringify(payload)
        };
        
        // console.log({options, url})
        return this.get(url, options);
        // const data = await fetch(url, options)
        //     .then(res => res.json())
        //     .then(res => {return res})
        //     .catch(err => console.log({err}));

        // if(data){
        //     return data;
        // }
        
    },
    get: async function (url, options = null) {
        const res = await fetch(url, options && options)
            .then(res => res.json())
            .then(res => {return res})
            .catch(err => console.log({err}));

        if(res){
            return res;
        }
    },
};

