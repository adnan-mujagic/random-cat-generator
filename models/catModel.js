let mongoose = require("mongoose")

let catSchema = mongoose.Schema({
    supportId: Number,
    minted: {
        type: Boolean,
        default: false
    },
    name: String,
    description: String,
    image: String,
    attributes: [
        {
            trait_type: String,
            value: String
        }
    ]

})

let Cat = mongoose.model("Cat", catSchema)

module.exports = Cat
