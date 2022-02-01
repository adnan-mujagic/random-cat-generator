const images = require("images")

const backgrounds = ["atomic-tangerine", "gold", "indian-red", "violet-blue"]
const eyes = ["blue", "brown", "crimson", "green", "yellow"]

const generateRandomImage = () => {
    let background = backgrounds[getRandomNumber(backgrounds.length)]
    let skin = getRandomNumber(3)
    let eye_color = eyes[getRandomNumber(eyes.length)]

    images("./images/backgrounds/bg-" + background + ".png")
        .draw(images("./images/skins/cat-" + skin + ".png"), 0, 0)
        .draw(images("./images/eyes/eyes-" + eye_color + ".png"), 0, 0)
        .save("./output/cat-" + [background, skin, eye_color].join("-") + ".png", {
            quality: 50
        })
}

const getRandomNumber = (highest) => {
    return Math.floor(Math.random() * highest)
}

const generateEveryPossibleCombination = () => {
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

generateEveryPossibleCombination()