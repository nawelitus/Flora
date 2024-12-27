import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Fade } from '@mui/material';

const ProductTable = ({ productos, onEdit, onDelete }) => {
    return (
        <Fade in={productos.length > 0}>
            <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: 1 }}>
                <Table size="small" sx={{ '& th, & td': { padding: '4px 8px' } }}>
                    <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)' }}>
                            <TableCell sx={{ color: '#388E3C', fontWeight: 'bold', fontSize: '0.85rem' }}>Producto</TableCell>
                            <TableCell sx={{ color: '#388E3C', fontWeight: 'bold', fontSize: '0.85rem' }}>Precio</TableCell>
                            <TableCell sx={{ color: '#388E3C', fontWeight: 'bold', fontSize: '0.85rem' }}>Stock</TableCell>
                            <TableCell sx={{ color: '#388E3C', fontWeight: 'bold', fontSize: '0.85rem' }}>Categoría</TableCell>
                            <TableCell sx={{ color: '#388E3C', fontWeight: 'bold', fontSize: '0.85rem' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto, index) => (
                            <TableRow
                                key={producto.id}
                                hover
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: '#E8F5E9' },
                                }}
                            >
                                <TableCell sx={{ fontSize: '0.8rem' }}>{producto.producto}</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem' }}>${producto.precio_venta}</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem' }}>{producto.stock}</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem' }}>{producto.categoria}</TableCell>
                                <TableCell sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => onEdit(producto)}
                                        sx={{ color: '#388E3C', fontSize: '0.7rem', padding: '2px 4px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete(producto.id)}
                                        sx={{ fontSize: '0.7rem', padding: '2px 4px' }}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fade>
    );
};

export default ProductTable;
