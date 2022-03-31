const request = require('request')

const geoCodeSearch = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2VsdmkiLCJhIjoiY2wxM2VzYnZ2MGdnODNjczBzczV4ams4NyJ9.FuNEvKTng3V7aXV_lWt3NA'
   request({url: geocodeUrl, json: true}, (error, response) => {
       if(error) {
           callback('Not able to reach location service', undefined)
        } else if(response.body.error) {
            callback('Not able to fetch location details', undefined)
        } else if(response.body.features === undefined || response.body.features.length === 0) {
            callback('Not able to fetch this location. Please try with some other location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
   })
}

module.exports = geoCodeSearch