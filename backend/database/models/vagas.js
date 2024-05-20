const mongoose = require("mongoose");

const vagasModel = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    datePosted: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Vagas", vagasModel);