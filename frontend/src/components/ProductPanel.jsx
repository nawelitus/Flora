// Optimized ProductPanel.jsx
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import {
    Drawer,
    Box,
    Button,
    Typography,
    Grid,
    TextField,
} from '@mui/material';

const initialState = {
    producto: '',
    stock: 0,
    unidadesStock: '',
    precioVenta: 0,
    precioCosto: 0,
    precioSugerido: 0,
    incremento: 0,
    categoria: '',
    subCategoria: '',
};

function reducer(state, action) {
    return { ...state, [action.field]: action.value };
}

function AddProductForm({ onAddProduct, onClose }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const precioSugerido = useMemo(() => {
        return parseFloat(state.precioCosto) + parseFloat(state.precioCosto) * (state.incremento / 100);
    }, [state.precioCosto, state.incremento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoProducto = { ...state, precioSugerido: precioSugerido.toFixed(2) };
        onAddProduct(nuevoProducto);
        onClose();
    };

    return (
        <Box
            sx={{
                width: 400,
                p: 4,
                background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                borderRadius: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    color: '#388E3C',
                    fontFamily: 'Onest, sans-serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                }}
            >
                Agregar Producto
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Producto"
                            name="producto"
                            fullWidth
                            required
                            value={state.producto}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Precio Costo"
                            name="precioCosto"
                            fullWidth
                            required
                            type="number"
                            value={state.precioCosto}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Incremento"
                            name="incremento"
                            fullWidth
                            type="number"
                            value={state.incremento}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Precio Venta"
                            name="precioVenta"
                            fullWidth
                            required
                            type="number"
                            value={precioSugerido.toFixed(2)}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Stock"
                            name="stock"
                            fullWidth
                            required
                            type="number"
                            value={state.stock}
                            onChange={handleChange}
                            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            color: '#388E3C',
                            borderColor: '#388E3C',
                            borderRadius: 1,
                            '&:hover': { backgroundColor: '#A5D6A7' },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            borderRadius: 1,
                            background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                            '&:hover': {
                                background: 'linear-gradient(to right, #DCEDC8, #A8E6CF)',
                            },
                        }}
                    >
                        Agregar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default React.memo(AddProductForm);