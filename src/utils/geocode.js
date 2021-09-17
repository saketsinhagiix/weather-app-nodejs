const request = require('postman-request');
const chalk = require('chalk');
const cl = console.log;


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FrZXRicmlqc2luaGEiLCJhIjoiY2t0azRueHNhMWloNTJwbXJ5dDV2N3RzciJ9.jLHXBNKHDBFLIY6BhlRkkQ&limit=1';

    request({ 
        url, 
        json: true 
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect location service... :(', undefined);
        } else if(body && body.message || body && body.features && !body.features.length) {
            callback('No matching results found. Try again with different search term... :(', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;