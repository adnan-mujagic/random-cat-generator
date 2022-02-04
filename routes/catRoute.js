const { getCat, uploadAllCattos, nonMintedCattos, mintCat } = require("../services/catService")

let router = require("express").Router()

router.route("/cattos")
    .get(getCat)

router.route("/uploadAllCattos")
    .get(uploadAllCattos)

router.route("/mintCat/:path")
    .put(mintCat)

module.exports = router