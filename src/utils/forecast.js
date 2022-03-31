const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=778c40394cbbee11b59a555343b7d8e8&query=' + latitude + ',' + longitude
    console.log('url ' + url)
    request({url: url, json: true}, (error, response) => {
        if(error) {
           callback('Not able to reach weather stack service', undefined)
        } else if(response.body.error) {
           callback('Unable to find location', undefined) 
        } else {
           callback(undefined, 'It\'s currently ' + response.body.current.temperature + ' degrees out. but feels like ' + response.body.current.feelslike + ' degree out.')
       }
   })
}

module.exports = forecast
