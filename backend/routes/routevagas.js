const express = require("express");
const route = express.Router();
const Vagas = require("../database/models/vagas");

route.get("/", async (req, res) => {

    try {

        const vagas = await Vagas.find();
        res.status(200).json(vagas);

    }

    catch (err) {

        res.status(500).json({message: err.message});

    }

});

route.get('/:id', async (req, res) => {
    
    try {

        const vaga = await Vagas.findById(req.params.id);
        if (!vaga) return res.status(404).json({ message: 'Vaga não encontrada' });
        res.json(vaga);

    }
    
    catch (err) {

        res.status(500).json({ message: err.message });
    
    }
    
});

route.post("/", async (req, res) => {

    try {

        const vaga = new Vagas(req.body);
        const savedVaga = await vaga.save();

        res.status(201).json(savedVaga);

    }

    catch (err) {

        res.status(400).json({message: err.message});

    }

});

module.exports = route;