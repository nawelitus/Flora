const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/database');
const router = express.Router();

const JWT_SECRET = 'tu_secreto_super_seguro'; // Cambia esto por una clave secreta segura

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        // Buscar usuario en la base de datos
        const query = 'SELECT * FROM usuarios WHERE usuario = ?';
        const [results] = await db.query(query, [usuario]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const user = results[0];

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id, usuario: user.usuario }, JWT_SECRET, {
            expiresIn: '1h', // El token expira en 1 hora
        });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Leer el encabezado Authorization
    if (!authHeader) return res.status(403).json({ error: 'Acceso denegado' });

    const token = authHeader.split(' ')[1]; // Eliminar la palabra "Bearer" del token
    if (!token) return res.status(403).json({ error: 'Token no válido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token no válido' });
        req.user = user; // Agregar el usuario a la solicitud
        next();
    });
};

module.exports = { router, authenticateToken };
