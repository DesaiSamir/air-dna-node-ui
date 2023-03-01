const config = require('../config');

module.exports = {
    active: {
        url: `${config.base_url_legacy}/market/supply/active?access_token=${config.access_token}&number_of_months=36`,
        query: [
            {
                name: 'city_id',
                default: 76953,
                is_required: true,
            },
            {
                name: 'start_month',
                default: 2,
                is_required: true,
            },
            {
                name: 'number_of_months',
                default: 36,
                is_required: false,
            },
        ]
    },
    area_info: {
        url: `${config.base_url_v2}/account/area_info_legacy?access_token=${config.access_token}`,
        query: [
            {
                name: 'city_id',
                default: 76953
            },
            {
                name: 'show_geom',
                default: false
            },
            {
                name: 'region_type',
                default: false
            },
            {
                name: 'neighbor_cities',
                default: true
            },
        ]
    },
    area_lookup: {
        url: `${config.base_url_legacy}/market/area_lookup?access_token=${config.access_token}&country=us`,
        query: [
            {
                name: 'country',
                default: 'us'
            },
            {
                name: 'state',
                default: 'pennsylvania'
            },
            {
                name: 'city',
                default: 'east-stroudsburg'
            },
        ]
    },
    neighbor_cities: {
        url: `${config.base_url_v2}/account/area_info_legacy?access_token=${config.access_token}`,
        query: [
            {
                name: 'city_id',
                default: 76953
            },
            {
                name: 'show_geom',
                default: false
            },
            {
                name: 'region_type',
                default: false
            },
            {
                name: 'neighbor_cities',
                default: true
            },
        ]
    },
    overview: {
        url: `${config.base_url_legacy}/market/overview?access_token=${config.access_token}`,
        query: [
            {
                name: 'city_id',
                default: 76953
            },
        ]
    },
    property_list: {
        url: `${config.base_url_v1}/property/list?access_token=${config.access_token}`,
        query: []
    },
    property_metrics: {
        url: `${config.base_url_legacy}/market/property_metrics/cities/:city_id?access_token=${config.access_token}&currency=USD`,
        query: [
            {
                name: 'currency',
                default: 'USD'
            },
        ]
    },
    search: {
        url: `${config.base_url_legacy}/market/search?access_token=${config.access_token}`,
        query: [
            {
                name: 'term',
                default: 'East Stroudsburg'
            },
        ]
    },
    top: {
        url: `${config.base_url_legacy}/market/property_managers/top?access_token=${config.access_token}&market_type=city`,
        query: [
            {
                name: 'market_id',
                default: 76953
            },
            {
                name: 'market_type',
                default: 'city'
            },
        ]
    },
};
