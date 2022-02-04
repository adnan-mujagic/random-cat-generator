let express = require("express")
let port = process.env.PORT || 3001
let cors = require("cors")

// Import routes here!
// ->
let catRoute = require("./routes/catRoute")

const app = express()

app.use(cors())

app.listen(port, function () {
    console.log("Listening on port " + port)
})

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// Here we will add all the routes!
// ->
app.use("/api", catRoute)

console.log("Testing");