const express = require('express');

const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res) => {
    //const { usuario, password } = req.body;
    usuario = "admin";
    password= usuario;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar contraseña
        const query = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)';
        const [result] = await db.query(query, [usuario, hashedPassword]);
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});