const request = require('request');

const mapBoxToken = 'pk.eyJ1IjoicnNta3Jpc2huYSIsImEiOiJjanlua3RmZDAwc2k5M25ub2h0NW5raDN0In0.qeBb2rQUqX4PBAv2E6kwRQ';

const geoLocation = (address, callback) => {

    const mapboxApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+mapBoxToken;


    request({url : mapboxApi, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to api', undefined)
        }else if(response.body.features.length === 0){
            callback('Location not found', undefined)
        }else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
        }
    })

}

const weatherDetail = (lat, lng, callback) => {
    const weatherApi = 'https://api.darksky.net/forecast/7014e25a2bc488cd1999196a6e3f018f/'+lat+','+lng;

    request({url: weatherApi, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to api', undefined)
        }else if(response.body.error){
            callback('Weather Details not found', undefined)
        }else{
            callback(undefined, {
                temperature : response.body.currently.temperature,
                precipType : response.body.currently.precipType,
                summary : response.body.currently.summary
            })
        }
    })
}

module.exports = {
    geoLocation : geoLocation,
    weatherDetail : weatherDetail
}
