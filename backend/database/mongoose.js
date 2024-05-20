const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.USER_DB;
const pass = process.env.PASS_DB;

try {

    mongoose.connect(`mongodb+srv://${user}:${pass}@ifound.h7vzmvd.mongodb.net/?retryWrites=true&w=majority&appName=Ifound`);

}
catch (err) {

    console.log("Erro ao tentar conectar com DB... Erro: "+err);

}


module.exports = mongoose;