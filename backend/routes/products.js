const express = require('express');
const router = express.Router();
const db = require('../models/database');
const { authenticateToken } = require('./auth'); // Importar el middleware

// Proteger todas las rutas con el middleware
router.use(authenticateToken);

// Crear un producto
router.post('/', async (req, res) => {
    const { producto, stock, unidades_stock , precio_venta, precio_costo, precio_sugerido, incremento, categoria, sub_categoria} = req.body;
    console.log(req.body);

    try {
        const query = `
            INSERT INTO productos (producto, stock,unidades_stock, precio_venta, precio_costo, precio_sugerido,  incremento, categoria, sub_categoria)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [producto, stock, unidades_stock, precio_venta, precio_costo, precio_sugerido,  incremento, categoria, sub_categoria]);
        res.status(201).json({ id: result.insertId, producto, stock, unidades_stock, precio_venta, precio_costo, precio_sugerido, incremento, categoria, sub_categoria });
    } catch (err) {
        console.error('Error al agregar producto:', err.message, err.stack);

        res.status(500).json({ error: err.message });
    }
});
// Listar todos los productos
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM productos');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { producto, stock, precio_venta, precio_costo, precio_sugerido, categoria, sub_categoria, unidades_stock, incremento } = req.body;

    try {
        const query = `
            UPDATE productos
            SET producto = ?, stock = ?, precio_venta = ?, precio_costo = ?, precio_sugerido = ?, categoria = ?, sub_categoria = ?, unidades_stock = ?, incremento = ?
            WHERE id = ?
        `;
        await db.query(query, [producto, stock, precio_venta, precio_costo, precio_sugerido, categoria, sub_categoria, unidades_stock, incremento, id]);
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM productos WHERE id = ?';
        await db.query(query, [id]);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
