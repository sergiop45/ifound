const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const enderecoEmpresa = new mongoose.Schema({

    rua: {type: String, required: true},
    bairro: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    cep: {type: String, required: true},

});

const empresaModel = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: enderecoEmpresa,
        required: true
    },
    site: {type: String},
    email_contato: { type: String, required: true },
    telefone_contato: { type: String, required: true },
    descricao: { type: String, required: true },
    data_criacao: { type: Date, default: Date.now },
    email_login: { type: String, required: true, unique: true },
    senha: { type: String, required: true }

});


empresaModel.pre("save", async function(next) {

    if(this.isModified('senha') || this.isNew) {

        try {
            const salt = await bcrypt.genSalt(10);
            this.senha = await bcrypt.hash(this.senha, salt);
            next();
        }

        catch (err) {
            next(err);
        }

    } else {
        next();
    }

});

empresaModel.methods.comparePassword = function (senha, cb) {
    bcrypt.compare(senha, this.senha, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
};


module.exports = mongoose.model("Empresa", empresaModel);