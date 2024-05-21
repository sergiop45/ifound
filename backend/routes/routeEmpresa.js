const express = require("express");
const route = express.Router();
const Empresas = require("../database/models/empresa");

route.post("/", async (req, res) => {

    try {

        const empresa = new Empresas(req.body);
        const savedEmpresa = await empresa.save();

        res.status(201).json(savedEmpresa);
    } 

    catch (err) {

        res.status(400).json({message: err.message});

    }

});

route.post('/login', async (req, res) => {
    const { email_login, senha } = req.body;
  
    try {
      const empresa = await Empresas.findOne({ email_login });
      if (!empresa) {
        return res.status(400).json({ message: 'Empresa não encontrada' });
      }
  
      empresa.comparePassword(senha, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (isMatch) {
          res.status(200).json({ message: 'Autenticação bem-sucedida' });
        } else {
          res.status(400).json({ message: 'Senha incorreta' });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = route;