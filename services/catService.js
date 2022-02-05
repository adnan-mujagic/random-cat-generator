const { writeFileSync } = require("fs")
const { generateRandomImage, eyes, backgrounds, rarities, generateCatPaths, generateCatData } = require("../general_functions/catGenerator")
const Cat = require("./../models/catModel")

module.exports.getCat = (req, res) => {

    Cat.find({minted: false}).exec(function(err, cats){
        if (err || cats.length === 0) {
            res.json({
                status: "You cannot mint cats anymore"
            })
        } else {
            let randomCat = cats[randomlySelect(cats.length)]
            let properties = randomCat.path.split("-")
            let background = properties.length === 4 ? properties[1] : properties[1] + "-" + properties[2]
            let eye_color = properties.length === 4 ? properties[2] : properties[3]

            let cat = generateRandomImage(background, eye_color , properties[properties.length - 1][0] , randomCat.path)

            let catMetadata = {
                name: cat.name,
                description: getDescription(cat),
                image: `https://gateway.pinata.cloud/ipfs/QmQUBh9g2cYhAoTnnCQgfZPPgYk5jt2idvPqRbgCqeTric/${cat.path}`,
                attributes: [
                    {
                        trait_type: "Background Color",
                        value: background.toUpperCase()
                    },
                    {
                        trait_type: "Eye Color",
                        value: eye_color.toUpperCase()
                    }
                ]
            }

            writeFileSync(`./out/${randomCat.path}.json`, JSON.stringify(catMetadata))

            res.json(catMetadata)

        }
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
    return `${cat.name} is a cat with ${backgrounds[rarities.indexOf(cat.background_rarity)].replace("-", " ")} background, and ${eyes[rarities.indexOf(cat.eye_rarity)].replace("-"," ")} eyes!`
}

const randomlySelect = (length) => {
    return Math.round(Math.random() * length)
}