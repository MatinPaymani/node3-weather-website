const request = require('request');
const forecast =(location,callback) => {
 const url='http://api.weatherstack.com/current?access_key=ac5233df7e45b387bb9de6b76fe86154&query='+location

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the API!')
        } else if (response.body.error) {
            callback('unable to connect to API due to coordinate error it means it could not find the location')

        } else {
            callback(undefined,{
                name:response.body.location.name,
                country:response.body.location.country,
                temperature:response.body.current.temperature
              })
        }
    })
}



module.exports=forecast