const express = require("express");
const routevagas = require("./routes/routevagas");
const app = express();
const mongoose = require("./database/mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/vagas", routevagas);


app.listen(port, () => {

    console.log("Servidor rodando na porta " + port)

});