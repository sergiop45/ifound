const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");
const routeVagas = require("./routes/routevagas");
const routeEmpresas = require("./routes/routeEmpresa");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/vagas", routeVagas);
app.use("/empresas", routeEmpresas);


app.listen(port, () => {

    console.log("Servidor rodando na porta " + port)

});