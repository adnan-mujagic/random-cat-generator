const { writeFileSync } = require("fs")
const { generateRandomImage, generateCatData } = require("../general_functions/catGenerator")
const { getName, getProperties } = require("../general_functions/rarity")
const Cat = require("./../models/catModel")

module.exports.getCat = (req, res) => {
    Cat.find({minted: false}).exec(function(err, cats){
        res.json(cats[randomlySelect(cats.length)])
    })
}



module.exports.uploadAllCattos = (req, res) => {
    let cattoPaths = generateCatData()
    let catMetadata = []

    cattoPaths.forEach((catObj, idx) => {
        let properties = getProperties(catObj.path)
        writeFileSync(`./out/${catObj.path.replace(".png", ".json")}`, JSON.stringify(properties))
        catMetadata.push({
            ...properties,
            minted: false,
            supportId: idx
        })

    })

    Cat.insertMany(catMetadata, function(err, docs) {
        if (!err) {
            res.json({
                data: catMetadata
            })
        } else {
            res.json({
                status: "Not OK"
            })
        }
        
    })
    
}

module.exports.mintCat = (req, res) => {
    let {supportId} = req.params
    Cat.findOne({supportId: supportId}).exec(function(err, cat) {
        if (cat === null || err) {
            res.json({
                status: "Couldn't find that cat"
            })
        } else {
            cat.minted = true
            cat.save(function(err) {
                if (err) {
                    res.json({
                        stauts:"Something went wrong while minting the cat!"
                    })
                } else {
                    res.json({
                        status:"OK",
                        data: cat
                    })
                }
            })
        }
        
    })
}



const randomlySelect = (length) => {
    return Math.round(Math.random() * length)
}