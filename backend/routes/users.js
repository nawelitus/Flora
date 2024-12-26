const express = require('express');
const router = express.Router();
const db = require('../models/database');
const { authenticateToken } = require('./auth'); // Importar el middleware

// Proteger todas las rutas con el middleware
router.use(authenticateToken);

// Crear un usuario
router.post('/', (req, res) => {
    const { usuario, password } = req.body;
    const query = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)';
    db.query(query, [usuario, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
});

// Listar todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { usuario, password } = req.body;
    const query = 'UPDATE usuarios SET usuario = ?, password = ? WHERE id = ?';
    db.query(query, [usuario, password, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario actualizado' });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;
