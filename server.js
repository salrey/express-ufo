//DEPENDENCIES 
const app = require("./app");

//CONFIGURATION
const dotenv = require("dotenv");
dotenv.config();

//PORT
const PORT = process.env.PORT;

//LISTEN
app.listen(PORT, () => {
    console.log(`👽 Listening to PORT: ${PORT} 🛸`)
})

