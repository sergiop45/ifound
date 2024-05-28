const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");
const helmet = require("helmet");
const routeVagas = require("./routes/routevagas");
const routeEmpresas = require("./routes/routeEmpresa");
require("dotenv").config();

const port = process.env.PORT || 3000;
const user = process.env.USER_DB;
const pass = process.env.PASS_DB;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use("/vagas", routeVagas);
app.use("/empresas", routeEmpresas);


app.listen(port, () => {

    console.log("Servidor rodando na porta " + port)

});

