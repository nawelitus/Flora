// EditProductForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

function EditProductForm({ producto, onUpdateProduct, onCancel }) {
    const [productoEditado, setProductoEditado] = useState({ ...producto });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoEditado((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onUpdateProduct(productoEditado);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
                Editar Producto
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Producto"
                        name="producto"
                        fullWidth
                        required
                        value={productoEditado.producto}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Stock"
                        name="stock"
                        fullWidth
                        required
                        type="number"
                        value={productoEditado.stock}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Unidades Stock"
                        name="unidades_stock"
                        fullWidth
                        required
                        value={productoEditado.unidades_stock}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Venta"
                        name="precio_venta"
                        fullWidth
                        required
                        type="number"
                        value={productoEditado.precio_venta}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Costo"
                        name="precio_costo"
                        fullWidth
                        required
                        type="number"
                        value={productoEditado.precio_costo}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Precio Sugerido"
                        name="precio_sugerido"
                        fullWidth
                        type="number"
                        value={productoEditado.precio_sugerido}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Incremento"
                        name="incremento"
                        fullWidth
                        type="number"
                        value={productoEditado.incremento}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Categoría"
                        name="categoria"
                        fullWidth
                        value={productoEditado.categoria}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Subcategoría"
                        name="sub_categoria"
                        fullWidth
                        value={productoEditado.sub_categoria}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ px: 3 }}>
                    Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}

export default EditProductForm;
