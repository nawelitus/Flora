import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ProductPanel from '../components/ProductPanel';
import SearchBar from '../components/SearchBar';
import ProductTable from '../components/ProductTable';
import api from '../services/api';

function ProductsPage() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [openPanel, setOpenPanel] = useState(false);
    const [panelType, setPanelType] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const fetchProductos = useCallback(async () => {
        try {
            const response = await api.get('/productos');
            setProductos(response.data);
            setFilteredProductos(response.data);
            setCategories([...new Set(response.data.map((p) => p.categoria))]);
        } catch (err) {
            console.error('Error al cargar los productos:', err);
        }
    }, []);

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    const handleSearch = () => {
        const results = productos.filter((producto) =>
            producto.producto.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? producto.categoria === selectedCategory : true)
        );
        setFilteredProductos(results);
    };

    const handleOpenPanel = (type, producto = null) => {
        setPanelType(type);
        setProductoSeleccionado(producto);
        setOpenPanel(true);
    };

    const handleClosePanel = () => {
        setOpenPanel(false);
        setProductoSeleccionado(null);
    };

    const handleAddProduct = async (nuevoProducto) => {
        try {
            const response = await api.post('/productos', nuevoProducto);
            setProductos((prev) => [...prev, response.data]);
            setFilteredProductos((prev) => [...prev, response.data]);
            handleClosePanel();
        } catch (err) {
            console.error('Error al agregar producto:', err);
        }
    };

    const handleUpdateProduct = async (productoActualizado) => {
        try {
            await api.put(`/productos/${productoActualizado.id}`, productoActualizado);
            setProductos((prev) =>
                prev.map((prod) => (prod.id === productoActualizado.id ? productoActualizado : prod))
            );
            setFilteredProductos((prev) =>
                prev.map((prod) => (prod.id === productoActualizado.id ? productoActualizado : prod))
            );
            handleClosePanel();
        } catch (err) {
            console.error('Error al actualizar producto:', err);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete(`/productos/${id}`);
            setProductos((prev) => prev.filter((producto) => producto.id !== id));
            setFilteredProductos((prev) => prev.filter((producto) => producto.id !== id));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((sum, product) => sum + (parseFloat(product.precio_venta) || 0), 0);
    };

    return (
        <Box sx={{ display: 'flex', width: '100vw', overflow: 'hidden' }}>
            <Drawer
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        padding: 2,
                        backgroundColor: '#f5f5f5',
                    },
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="normal"
                        color="#388E3C"
                        sx={{ textAlign: 'center', marginBottom: 2 }}
                    >
                        Seleccionados
                    </Typography>
                    <Divider sx={{ marginBottom: 1 }} />
                    <List>
                        {selectedProducts.map((product) => (
                            <ListItem key={product.id}>
                                <ListItemText
                                    primary={product.producto}
                                    secondary={`Precio: $${product.precio_venta}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ textAlign: 'center' }}>
                        Total: ${calculateTotal().toFixed(2)}
                    </Typography>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, marginLeft: isDrawerOpen ? '300px' : '0' }}>
                <AppBar position="static" sx={{ background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)' }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={handleToggleDrawer} sx={{ marginRight: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1, color: '#388E3C', fontSize: '2em' }}>
                            F L O R A
                        </Typography>
                        <IconButton color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                            onSearch={handleSearch}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ color: '#388E3C', fontWeight: 'bold', marginRight: 2 }}>
                                Total Productos: {filteredProductos.length}
                            </Typography>
                            <IconButton
                                color=""
                                onClick={() => handleOpenPanel('add')}
                                sx={{
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                                    background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                                    '&:hover': { background: 'linear-gradient(to right, #DCEDC8, #A8E6CF)' },
                                }}
                            >
                                <AddBoxIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <ProductTable
                        productos={filteredProductos}
                        onEdit={(producto) => handleOpenPanel('edit', producto)}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductPanel
                        isOpen={openPanel}
                        onClose={handleClosePanel}
                        type={panelType}
                        onAction={panelType === 'add' ? handleAddProduct : handleUpdateProduct}
                        producto={productoSeleccionado}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ProductsPage;
