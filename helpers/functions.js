///////HELPER FUNCTIONS///////

//Add For In Loop within sightingsData.filter and test more than 3 queries for each sighting
const filteredSightings = (requestQuery, sighting, test) => {
    for (let query in requestQuery) {
        const input = requestQuery[query].toLowerCase()
        if (sighting[query]?.toLowerCase() === input) {
            test = true 
        } else {
            test = false
            break;
        }
    }
    return test    
    // http://localhost:3333/sightings?state=NY&city=Morrisonville&shape=Egg&posted=7/5/19&report_link=http://www.nuforc.org/webreports/147/S147284.html
} 

const formatSightings = (sightings) => {
    return sightings.map((sighting) => {
        return (
            `<div>
                <hr></hr>
                <p>Date: ${sighting.date_time}</p>
                <p>City: ${sighting.city}</p>
                <p>State: ${sighting.state}</p>
                <p>Shape: ${sighting.shape}</p>
                <p>Duration: ${sighting.duration}</p>
                <p>Text: ${sighting.text}</p>
                <hr></hr></div>`
        )
    }).join("")
}

const formInputs = `
<form action="/sightings" method="GET">
    <label for="state">State:</label>
    <input type="text" name="state">
    <label for="city">City:</label>
    <input type="text" name="city">
    <label for="shape">Shape:</label>
    <input type="text" name="shape"><br></br>
    <label for="sort">Sort Results By:</label>
    <input type="radio" id="sortState" name="sortBy" value="state">
    <label for="sortState">State</label>
    <input type="radio" id="sortCity" name="sortBy" value="city">
    <label for="sortCity">City</label>
    <input type="radio" id="sortTime" name="sortBy" value="time" checked>
    <label for="sortTime">Time</label><br></br>
    <input type="submit" value="Submit">
</form>`

//SORT Results BY
const sortAsc = (sightings, selection) => {
    if (selection === "time") {
        return sightings.sort((a,b) => {
            const statsA = a.stats?.split(" ")
            const statsATime = statsA[2] + " " + statsA[3]
            const statsB = b.stats?.split(" ")
            const statsBTime = statsB[2] + " " + statsB[3]
            return Date.parse(statsATime)-Date.parse(statsBTime)
        })
    } else {
        return sightings.sort((a,b) => {
            if (a[selection] > b[selection]) {return 1}
            if (a[selection] < b[selection]) {return -1}
            return 0  
        })
    }
}

module.exports = {
    filteredSightings,
    formatSightings,
    formInputs,
    sortAsc
}