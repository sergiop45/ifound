const express = require("express");
const route = express.Router();
const Empresas = require("../database/models/empresa");
const isAuthenticated = require("../auth");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

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

          const token = jwt.sign({ userId: empresa._id, username: empresa.email_login }, secretKey, { expiresIn: "1h"});
          res.json(token);
        
        } else {
          res.status(400).json({ message: 'Senha incorreta' });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

route.get("/", isAuthenticated, async (req, res) => {

  try {

    const empresas = await Empresas.find();
    res.status(200).json(empresas);

  }

  catch (err) {

    res.status(500).json({message: err.message});

  }

})
  
// Rota de logout
route.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout.');
    }
    res.send('Logout bem-sucedido!');
  });
});


module.exports = route;