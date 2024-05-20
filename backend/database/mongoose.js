const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.USER_DB;
const pass = process.env.PASS_DB;

mongoose.connect(`mongodb+srv://${user}:${pass}@ifound.h7vzmvd.mongodb.net/?retryWrites=true&w=majority&appName=Ifound`);

module.exports = mongoose;