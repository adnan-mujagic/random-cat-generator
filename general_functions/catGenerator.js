const images = require("images")
const { getBackground, getSkin, getEyes, getName } = require("./rarity")

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

module.exports.generateCatData = () => {
    let possibilities = []
    for(let i = 0; i < backgrounds.length; i++) {
        for(let j = 0; j < eyes.length; j++) {
            for(let k = 0; k < 3; k++) {
                possibilities.push({
                    path :"cat-" + [backgrounds[i], eyes[j], k].join("-") + ".png",
                    minted: false
                })
            }
        }
    }
    return possibilities
}

module.exports.generateRandomImage = (preset_bg, preset_eyes, preset_skin, preset_path) => {
    let background = preset_bg ? preset_bg : getBackground()
    let eye_color = preset_eyes ? preset_eyes : getEyes()
    let skin = preset_skin ? preset_skin : getSkin()

    // returns file name of the cat
    return {
        name: getName(),
        path: preset_path ? preset_path : "cat-" + [background, eye_color, skin].join("-") + ".png",
        eye_rarity: rarities[eyes.indexOf(eye_color)],
        background_rarity: rarities[backgrounds.indexOf(background)]
    }
}

module.exports.rarities = rarities
module.exports.backgrounds = backgrounds
module.exports.eyes = eyes