const express = require("express");
const route = express.Router();
const Vagas = require("../database/models/vagas");
const isAuthenticated = require("../auth");
const session = require("express-session");

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

route.post("/", isAuthenticated,async (req, res) => {

    try {

        const vaga = new Vagas(req.body);
        const savedVaga = await vaga.save();

        res.status(201).json(savedVaga);

    }

    catch (err) {

        res.status(400).json({message: err.message});

    }

});

route.put('/:id', isAuthenticated,async (req, res) => {

    if (req.params.id != req.user.userId) {

        res.status(401).json({message: "Usuario não autorizado!"});

    } else {

        try {
    
            const updatedVaga = await Vagas.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedVaga) return res.status(404).json({ message: 'Vaga não encontrada' });
            res.json(updatedJob);
        
        }
        
        catch (err) {
    
            res.status(400).json({ message: err.message });
            
        }

    }
    
});

route.delete('/:id', isAuthenticated, async (req, res) => {

    if (req.params.id != req.user.userId) {

        res.status(401).json({message: "Usuario não autorizado!"});

    } else {
        
        try {

            const deletedVaga = await Vagas.findByIdAndDelete(req.params.id);
            if (!deletedVaga) return res.status(404).json({ message: 'Vaga não encontrada' });
            res.json({ message: 'Vaga deletada com sucesso' });
    
        } 
        
        catch (err) {
        
            res.status(500).json({ message: err.message });
        
        }   

    }
    
});

module.exports = route;