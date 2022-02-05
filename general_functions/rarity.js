const backgrounds = ["white", "indian-red", "blue-munsell", "violet-blue", "gold"]
const eyes = [ "brown", "green", "yellow", "blue", "crimson"]
const furs = ["orange", "white", "black"]
const cat_names = ["Ash", "Pixie", "Daisy", "Trevor", "Garfield", "Bethany", "Dice", "Annie", "Miso", "Charlie", "Kate"]


module.exports.getBackground = () => {
    let number = generateRandomNumber()
    if (number > 0 && number <40) {
        return backgrounds[0]
    } else if (number >= 40 && number <70) {
        return backgrounds[1]
    } else if (number >= 70 && number < 85) {
        return backgrounds[2]
    } else if (number >= 85 && number < 95) {
        return backgrounds[3]
    } else {
        return backgrounds[4]
    }
}

module.exports.getSkin = () => {
    let number = generateRandomNumber()
    if (number > 0 && number < 50) {
        return 2
    } else if (number >= 50 && number < 80) {
        return 1
    }
    return 0;
}

module.exports.getEyes = () => {
    let number = generateRandomNumber()
    if (number > 0 && number <40) {
        return eyes[0]
    } else if (number >= 40 && number <70) {
        return eyes[1]
    } else if (number >= 70 && number < 85) {
        return eyes[2]
    } else if (number >= 85 && number < 95) {
        return eyes[3]
    } else {
        return eyes[4]
    }
}

module.exports.getName = () => {
    return cat_names[Math.floor(Math.random() * cat_names.length)]
}

module.exports.getProperties = (path) => {
    let properties = path.split("-")
    let background = properties.length === 4 ? properties[1] : [properties[1], properties[2]].join("-")
    let eyeColor = properties.length === 4 ? properties[2] : properties[3]
    let furIndex = properties[properties.length - 1].replace(".png", "")
    let fur = furs[parseInt(furIndex)]

    let name = this.getName()
    let description = getDescription(name, fur, background, eyeColor)
    let image = `https://gateway.pinata.cloud/ipfs/QmQUBh9g2cYhAoTnnCQgfZPPgYk5jt2idvPqRbgCqeTric/${path}`
    let attributes = [
        {
            trait_type: "Fur Color",
            value: fur.toUpperCase(),
        }, {
            trait_type: "Background Color",
            value: background.toUpperCase().replace("-", " "),
        }, {
            trait_type: "Eye Color",
            value: eyeColor.toUpperCase()
        }
    ]

    return {
        name,
        description,
        image,
        attributes
    }
}

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1
}

const getDescription = (name, fur, background, eyes) => {
    return `${name} is ${fur === "orange" ? "an" : "a"} ${fur} cat with ${background.replace("-", " ")} background and ${eyes} eyes!`
}