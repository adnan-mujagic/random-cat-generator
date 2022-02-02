const { generateRandomImage, eyes, backgrounds, rarities } = require("../general_functions/catGenerator")

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

const getDescription = (cat) => {
    return `${cat.name} is a cat with ${cat.background_rarity}, ${backgrounds[rarities.indexOf(cat.background_rarity)].replace("-", " ")} background, and ${cat.eye_rarity}, ${eyes[rarities.indexOf(cat.eye_rarity)].replace("-"," ")} eyes!`
}