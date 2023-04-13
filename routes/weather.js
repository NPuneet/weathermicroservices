const express = require("express");
const https = require('https')

const weatherRoute = express.Router();
weatherRoute.get("/", (req, res)=>{
    res.sendFile(__dirname, + "/index.html")   
})

weatherRoute.post("/", (req, res)=>{
        const city = req.body.cityName
        const appiKey = "26f5a81d5ca71b90d1fec4682f640f95" 
        const unit = req.body.unit

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+appiKey+"&units="+unit+""
        https.get(url, (response)=>{
            response.on("data", (chunk)=>{
                const responseData = JSON.parse(chunk);
                const temperature = responseData.main.temp;
                const weatherDes = responseData.weather[0].description;
                const icon = responseData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
                const cityName = responseData.name;
                res.write(`<h1>The weather is ${temperature}  Kelvin in ${cityName} and the description is ${weatherDes} </h1>`)
                res.write("<img src="+ imageURL +">")
                res.send()
            })
        })
})
module.exports = weatherRoute