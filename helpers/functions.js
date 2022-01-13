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

const formInputs = `
<form action="/sightings" method="GET">
    <label for="state">State:</label>
    <input type="text" name="state">
    <label for="city">City:</label>
    <input type="text" name="city">
    <label for="shape">Shape:</label>
    <input type="text" name="shape">
    <input type="submit" value="Submit">
</form>`

module.exports = {
    filteredSightings,
    formInputs
}