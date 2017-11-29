const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const axios = require('axios');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for: ',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error('Unable to find that address');
    }

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/f071f649293e97139cfe5f58ee725efe/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl).then((response) => {
        const temp = response.data.currently.temperature;
        const apparentTemp = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temp}. It feels like ${apparentTemp}`);
    })
}).catch((e) => {
    if (e.code === "ENOTFOUND") {
        console.log('Unable to connect to API');
    }
    else {
        console.log(e.message);
    }
})




