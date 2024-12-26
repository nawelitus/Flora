const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/database');
const authRoutes = require('./routes/auth').router;

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use(express.json());
// Rutas
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.use('/api/usuarios', usersRoutes);
app.use('/api/productos', productsRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://190.14.32.117:${PORT}`);
});
