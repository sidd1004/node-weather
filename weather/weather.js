const request = require('request');

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/f071f649293e97139cfe5f58ee725efe/${lat},${lng}`,
        json: true,
    },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
            else {
                callback("Unable to fetch Weather");
            }
        })
}



module.exports.getWeather = getWeather;