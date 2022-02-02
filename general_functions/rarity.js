const backgrounds = ["white", "indian-red", "blue-munsell", "violet-blue", "gold"]
const eyes = [ "brown", "green", "yellow", "blue", "crimson"]
// basic, uncommon, rare, scarce, extraordinary
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

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1
}