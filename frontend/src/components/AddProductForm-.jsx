// AddProductForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

function AddProductForm({ onAddProduct }) {
    const [producto, setProducto] = useState('');
    const [stock, setStock] = useState(0);
    const [unidadesStock, setUnidadesStock] = useState('');
    const [precioVenta, setPrecioVenta] = useState(0);
    const [precioCosto, setPrecioCosto] = useState(0);
    const [precioSugerido, setPrecioSugerido] = useState(0);
    const [incremento, setIncremento] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoProducto = {
            producto,
            stock,
            unidades_stock: unidadesStock,
            precio_venta: precioVenta,
            precio_costo: precioCosto,
            precio_sugerido: precioSugerido,
            incremento,
            categoria,
            sub_categoria: subCategoria,
        };
        onAddProduct(nuevoProducto);
        setProducto('');
        setStock(0);
        setUnidadesStock('');
        setPrecioVenta(0);
        setPrecioCosto(0);
        setPrecioSugerido(0);
        setIncremento(0);
        setCategoria('');
        setSubCategoria('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
                Agregar Producto
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Producto"
                        fullWidth
                        required
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Stock"
                        fullWidth
                        required
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Unidades Stock"
                        fullWidth
                        required
                        value={unidadesStock}
                        onChange={(e) => setUnidadesStock(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Venta"
                        fullWidth
                        required
                        type="number"
                        value={precioVenta}
                        onChange={(e) => setPrecioVenta(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Costo"
                        fullWidth
                        required
                        type="number"
                        value={precioCosto}
                        onChange={(e) => setPrecioCosto(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Sugerido"
                        fullWidth
                        type="number"
                        value={precioSugerido}
                        onChange={(e) => setPrecioSugerido(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Incremento"
                        fullWidth
                        type="number"
                        value={incremento}
                        onChange={(e) => setIncremento(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Categoría"
                        fullWidth
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Subcategoría"
                        fullWidth
                        value={subCategoria}
                        onChange={(e) => setSubCategoria(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ px: 3 }}>
                    Agregar
                </Button>
            </Box>
        </Box>
    );
}

export default AddProductForm;