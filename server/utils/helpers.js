const request = require('request');
const fetch = require('node-fetch');
const config = require('../config');
// const db = require('./db_access');

module.exports = {
    get: async function(req, res, url) {
        return await this.send(req, res, 'GET', url);
    },

    post: async function(req, res, url, payload) {
        return await this.send(req, res, 'POST', url, payload);
    },

    send: async function(req, res, method, url, payload = null) {
        var res;
        switch (method) {
            case 'GET':
                res = await fetch(url
                ).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response);
                    }
                }).catch(function (err) {
                    const errRes = {
                        'status': err.status,
                        'statusText': err.statusText,
                        // 'url': err.url
                    }
                    return errRes;
                });
                break;

            case 'POST':
                payload = JSON.stringify(payload);
                // console.log({method:'POST', url, payload});
                res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: payload
                })
                .then(response => response.json())
                .then((json) => {
                    return json;
                });
                break;

            case 'PUT':
                payload = JSON.stringify(payload);
                const putPayloadLen = payload.length;
                // console.log({method:'PUT', url, payload});
                res = await fetch(`${ts.base_url}${url}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `bearer ${req.session.access_token}`,
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/vnd.tradestation.streams+json',
                        "Content-Length": putPayloadLen
                    },
                    body: payload
                })
                .then(response => response.json())
                .then((json) => {
                    return json;
                });
                break;

            case 'DELETE':
                payload = JSON.stringify(payload);
                // console.log({method:'DELETE', url, payload});
                res = await fetch(`${ts.base_url}${url}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `bearer ${req.session.access_token}`,
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/vnd.tradestation.streams+json'
                    }
                })
                .then(response => response.json())
                .then((json) => {
                    return json;
                });
                break;

            default:
                break;
        }
        
        return res;
    },

    getDate: function(date = new Date()) {
        var retDate = new Date(date); // M-D-YYYY

        var d = retDate.getDate();
        var m = retDate.getMonth() + 1;
        var y = retDate.getFullYear();

        var dateString = (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + '-' + y;

        return dateString;

    }

}