const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/05209e944439f91c1c72d03e3bcfec3b/'+ encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'?units=si';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to website', undefined);
        } if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'There is ' + body.currently.temperature + ' with ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast;