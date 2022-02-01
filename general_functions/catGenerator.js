const images = require("images")
const { getBackground, getSkin, getEyes } = require("./rarity")

const backgrounds = ["white", "indian-red", "blue-munsell", "violet-blue", "gold"]
const eyes = [ "brown", "green", "yellow", "blue", "crimson"]
const rarities = ["basic", "uncommon", "rare", "scarce", "extraordinary"]

module.exports.generateEveryPossibleCombination = () => {
    for(let i = 0; i < backgrounds.length; i++) {
        for(let j = 0; j < eyes.length; j++) {
            for(let k = 0; k < 3; k++) {
                images("./images/backgrounds/bg-" + backgrounds[i] + ".png")
                    .draw(images("./images/skins/cat-" + k + ".png"), 0, 0)
                    .draw(images("./images/eyes/eyes-" + eyes[j] + ".png"), 0, 0)
                    .save("./output/cat-" + [backgrounds[i], eyes[j], k].join("-") + ".png", {
                        quality: 50
                    })
            }
        }
    }
}

module.exports.generateRandomImage = () => {
    let background = getBackground()
    let skin = getSkin()
    let eye_color = getEyes()

    // returns file name of the cat
    return {
        path: "cat-" + [background, eye_color, skin].join("-") + ".png",
        eye_rarity: rarities[eyes.indexOf(eye_color)],
        background_rarity: rarities[backgrounds.indexOf(background)]
    }
}