const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {

    res.status(200).send("Todas as vagas");

});

module.exports = route;