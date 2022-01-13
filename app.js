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
const { filteredSightings, formatSightings, formInputs, sortAsc } = require("./helpers/functions")

//CONFIGURATION
const app = express()

//ROUTES & CALLBACK
app.get("/", (_, response) => {
    response.send(formInputs + "Welcome to Express UFO App")
})

app.get("/sightings", (request, response) => { 
    //List out the queries with values
    const requestQuery = {}
    for (let key in request.query) {
        //No need to filter the sortBy key and keys with empty values 
        if (request.query[key] !== "" && key !== "sortBy") {
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
            //For cases with more than 3 queries, use For In loop on requestQuery Object to filter for each one
                sightingsFound = sightingsData.filter((sighting) => {
                    return filteredSightings(requestQuery, sighting) 
                })
                break;
        }
        
        result = `<main>
        ${formatSightings(sortAsc(sightingsFound, request.query.sortBy))}</main>`
    }
    //ERROR Handling - status codes
    if (sightingsFound.length) {
        // To set up form and form data, check functions.js file
        response.send(`${formInputs} <h1>Number of Sightings: ${sightingsFound.length}</h1>` + result)            
    } else {
        response.status(404).send(`${formInputs} <h1>No queries have been found.</h1>`)
    }
})

app.get("*", (_, response) => {
    response.status(404).json({error: "Resource not found"})
})

//EXPORT
module.exports = app;