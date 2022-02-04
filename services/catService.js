const { generateRandomImage, eyes, backgrounds, rarities, generateCatPaths, generateCatData } = require("../general_functions/catGenerator")
const Cat = require("./../models/catModel")

module.exports.getCat = (req, res) => {
    let cat = generateRandomImage()
    res.json({
        name: cat.name,
        description: getDescription(cat),
        image: `https://gateway.pinata.cloud/ipfs/QmQUBh9g2cYhAoTnnCQgfZPPgYk5jt2idvPqRbgCqeTric/${cat.path}`,
        attributes: [
            {
                trait_type: "Background Rarity",
                value: cat.background_rarity.toUpperCase()
            },
            {
                trait_type: "Eye Rarity",
                value: cat.eye_rarity.toUpperCase()
            }
        ]
    })
}

module.exports.uploadAllCattos = (req, res) => {
    let cattos = generateCatData()
    Cat.insertMany(cattos, function(err, docs) {
        if (!err) {
            res.json({
                data: cattos
            })
        }
        
    })
    
}

module.exports.nonMintedCattos = (req, res) => {
    Cat.find({minted: false}).exec(function(err, cattos) {
        if (err) {
            res.json({
                status: "Something went wrong"
            })
        } else {
            res.json({
                status: "OK",
                data: cattos
            })
        }
    })
}

module.exports.mintCat = (req, res) => {
    let {path} = req.params
    Cat.findOne({path: path}).exec(function(err, cat) {
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

const getDescription = (cat) => {
    return `${cat.name} is a cat with ${cat.background_rarity}, ${backgrounds[rarities.indexOf(cat.background_rarity)].replace("-", " ")} background, and ${cat.eye_rarity}, ${eyes[rarities.indexOf(cat.eye_rarity)].replace("-"," ")} eyes!`
}