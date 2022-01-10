//////////SIMPLE TERMINAL APP/////////
const sightingsData = require("./models/nuforc_reports.json")
// console.log(sightingsData[0])

// Run node app.js state=NY on terminal to run the app   
const state = process.argv[2]?.slice(6).toLowerCase();
// console.log(state)

// Using terminal to get data by state
// console.log(sightingsData.filter((sighting) => sighting.state?.toLowerCase() === state))

//////////EXPRESS APP/////////

//DEPENDENCIES 
const express = require("express");
const { filteredSightings } = require("./helpers/functions")

//CONFIGURATION
const app = express()

//ROUTES & CALLBACK
app.get("/", (request, response) => {
    response.send("Welcome to Express UFO App")
})

app.get("/sightings", (request, response) => { 
    //List out the queries with values
    const requestQuery = {}
    for (let key in request.query) {
        if (request.query[key] !== "") {
            requestQuery[key] = request.query[key]
        }
    }   
    const queries = Object.entries(requestQuery)

    // console.log(requestQuery)
    //Set early, default return if there are no queries
    let result = "No queries have been found."
    let sightingsFound = [];
    
    if (queries.length >= 1) {

        switch (queries.length) {
            case 1 :
                 sightingsFound = sightingsData.filter((sighting) => {
                    return sighting[queries[0][0]]?.toLowerCase() === queries[0][1].toLowerCase()
                });
                break;
            case 2 :
                sightingsFound = sightingsData.filter((sighting) => {
                    return sighting[queries[0][0]]?.toLowerCase() === queries[0][1].toLowerCase() && sighting[queries[1][0]]?.toLowerCase() === queries[1][1].toLowerCase()
                });
                break;
            case 3 :
                sightingsFound = sightingsData.filter((sighting) => {
                    return sighting[queries[0][0]]?.toLowerCase() === queries[0][1].toLowerCase() && sighting[queries[1][0]]?.toLowerCase() === queries[1][1].toLowerCase() && sighting[queries[2][0]]?.toLowerCase() === queries[2][1].toLowerCase() 
                })
                break;
            default : 
            //For cases with more than 3 queries, use For In loop on requestQuery Object 
                sightingsFound = sightingsData.filter((sighting) => {
                    return filteredSightings(requestQuery, sighting) 
                })
                break;
        }

        result = sightingsFound.length ? sightingsFound.map((sighting) => {
            return (
                `
                    <hr></hr>
                    <p>Date: ${sighting.date_time}</p>
                    <p>City: ${sighting.city}</p>
                    <p>State: ${sighting.state}</p>
                    <p>Shape: ${sighting.shape}</p>
                    <p>Duration: ${sighting.duration}</p>
                    <p>Text: ${sighting.text}</p>
                    <hr></hr>
                `
            )
        }).join("") : "No queries have been found."
    }

    response.send(`<h1>Number of Sightings: ${sightingsFound.length}</h1>` + result)
})

//EXPORT
module.exports = app;