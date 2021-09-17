const request = require('postman-request');
const chalk = require('chalk');
const cl = console.log;


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d254db429753e1e4b7c534af70654a98&query='+ latitude + ',' + longitude + '&units=m';

    request({ 
        url, 
        json: true 
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect weather service... :(', undefined);
        } else if(body && body.error) {
            callback('Unable to find location.. :(', undefined);
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.',
            });
        }
    });
};

module.exports = forecast;