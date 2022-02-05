const { getCat, uploadAllCattos, nonMintedCattos, mintCat, getMintedCats } = require("../services/catService")

let router = require("express").Router()

router.route("/cattos")
    .get(getCat)

router.route("/uploadAllCattos")
    .get(uploadAllCattos)

router.route("/mintCat/:supportId")
    .put(mintCat)

router.route("/getMintedCattos")
    .get(getMintedCats)

module.exports = router