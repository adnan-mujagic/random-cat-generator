let mongoose = require("mongoose")

let catSchema = mongoose.Schema({
    path: String,
    minted: {
        type: Boolean,
        default: false
    }
})

let Cat = mongoose.model("Cat", catSchema)

module.exports = Cat
