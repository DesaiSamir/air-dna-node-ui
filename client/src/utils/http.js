export const getActiveListings = async function(city_id, cb){
    const result = await this.get(`api/active?city_id=${city_id}`, cb);
    
    if(result){
        cb(result);
    }
}
export const getAreaInfo = async function(city_id, cb) {
    const result = await this.get(`api/area_info?city_id=${city_id}`, cb);

    if(result){
        cb(result);
    }
}
export const getAreaLookup = async function(state, city_name, cb){
    const result = await this.get(`api/area_lookup?state=${state.toLowerCase()}&city=${city_name.toLowerCase()}`);
    
    if(result){
        cb(result);
    }
}
export const getNeighborCities = async function(city_id, cb) {
    const result = await this.get(`api/neighbor_cities?city_id=${city_id}`, cb);

    if(result){
        cb(result);
    }
}
export const getOverview = async function(city_id, cb){
    const result = await this.get(`api/overview?city_id=${city_id}`);

    if(result){
        cb(result);
    }
}
export const getPropertyList = async function(payload, cb){
    const result = await this.send('POST','api/property_list', payload);

    if(result){
        cb(result);
    }
}
export const getPropertyMetrics = async function(city_id, cb){
    const result = await this.get(`api/property_metrics?city_id=${city_id}`);

    if(result){
        cb(result);
    }
}
export const getSearch = async function(city_name, cb){
    const result = await this.get(`api/search?term=${city_name}`);

    if(result){
        cb(result);
    }
}
export const getTopPropertyManagers = async function(city_id, cb){
    const result = await this.get(`api/top?city_id=${city_id}`);

    if(result){
        cb(result);
    }
}
export const send = async function (method, url, payload = null) {
    var options = {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: payload && JSON.stringify(payload)
    };
    
    return this.get(url, options)
    
}
export const get = async function (url, options = null) {
    const res = await fetch(url, options && options)
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log({err}));

    if(res){
        return res;
    }
}

