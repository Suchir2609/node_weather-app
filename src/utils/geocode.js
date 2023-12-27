const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.geoapify.com/v1/geocode/search?text='+encodeURIComponent(address)+'&lang=en&limit=1&type=city&apiKey=36de7700658d463faaa05656b2592c49'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to location service!", undefined)
        } else if (body.features.length===0) {
            callback('unable to find location, try again', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].properties.lat,
                longitude : body.features[0].properties.lon,
                location : body.features[0].properties.formatted
            })
        }
    })
}

const forecast = (latitude,longitude, callback)=>{
    url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+ encodeURIComponent(longitude)+'&units=metric&appid=ec56c5b3662ad73192401c57131e3ec5'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to service!", undefined)
        } else if (body.message) {
            callback('unable to find location, try again', undefined)
        } else {
            data = body.main
            temp = data.temp
            callback(undefined, "It is currently " + temp + " degrees outside, and the humidity is " + data.humidity + "%")
}})
}

module.exports = {
    geocode:geocode,
    forecast:forecast,
}