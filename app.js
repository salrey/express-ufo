//SIMPLE TERMINAL APP
const sightingsData = require("./models/nuforc_reports.json")
// console.log(sightingsData[0])

// Run node app.js state=NY on terminal to run the app   
const state = process.argv[2]?.slice(6).toLowerCase();
// console.log(state)

// Using terminal to get data by state
console.log(sightingsData.filter((sighting) => sighting.state?.toLowerCase() === state))

//DEPENDENCIES 
const express = require("express");

//CONFIGURATION
const app = express()

//ROUTES & CALLBACK
app.get("/", (request, response) => {
    response.send("Welcome to Express UFO App")
})

//EXPORT
module.exports = app;