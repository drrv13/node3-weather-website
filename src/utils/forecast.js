const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/05209e944439f91c1c72d03e3bcfec3b/'+ encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'?units=si';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to website', undefined);
        } if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' There is ' + body.currently.temperature + ' with ' + body.currently.precipProbability + '% chance of rain and wind speed of ' + body.currently.windSpeed + '. Min Temperature is ' + body.daily.data[0].temperatureLow + ' and max temperature is ' + body.daily.data[0].temperatureHigh);
        }
    })
}

module.exports = forecast;