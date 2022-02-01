const { getCat } = require("../services/catService")

let router = require("express").Router()

router.route("/cattos")
    .get(getCat)

module.exports = router