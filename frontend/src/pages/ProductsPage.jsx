import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    Fade,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from 'react-router-dom';
import ProductPanel from '../components/ProductPanel';
import api from '../services/api';

function ProductsPage() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [openPanel, setOpenPanel] = useState(false);
    const [panelType, setPanelType] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos');
                setProductos(response.data);
                setFilteredProductos(response.data);
                setShowTable(true);
            } catch (err) {
                console.error('Error al cargar los productos:', err);
            }
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        const filtered = productos.filter((producto) => {
            const matchesSearchTerm = producto.producto.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategoria = selectedCategoria ? producto.categoria === selectedCategoria : true;
            return matchesSearchTerm && matchesCategoria;
        });
        setFilteredProductos(filtered);
    }, [searchTerm, selectedCategoria, productos]);

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
            handleClosePanel();
        } catch (err) {
            console.error('Error al actualizar producto:', err);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete(`/productos/${id}`);
            setProductos((prev) => prev.filter((producto) => producto.id !== id));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleAddToList = (producto) => {
        setSelectedProducts((prev) => [...prev, producto]);
    };

    const handleRemoveFromList = (index) => {
        setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClearList = () => {
        setSelectedProducts([]);
        setIsDrawerOpen(false);
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((sum, product) => sum + (parseFloat(product.precio_venta) || 0), 0);
    };

    const handlePrintList = () => {
        const printableContent = selectedProducts.map(
            (product) => `${product.producto} - $${product.precio_venta}`
        ).join('\n');

        const total = `Total: $${calculateTotal().toFixed(2)}`;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<pre>${printableContent}\n\n${total}</pre>`);
        printWindow.document.close();
        printWindow.print();
    };

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <Box sx={{ display: 'flex', width: '100vw', overflow: 'hidden' }}>
            {/* Drawer con desplazamiento persistente */}
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
            textShadow= '2px 2px 4px rgba(0, 0, 0, 0.2)'
            color="#388E3C"
            sx={{ textAlign: 'center', marginBottom: 2 }}
        >
            Seleccionados
        </Typography>
        <Divider sx={{ marginBottom: 0 }} />
        <List>
            {selectedProducts.map((product, index) => (
                <ListItem
                    key={product.uniqueId}
                    onDoubleClick={() => handleRemoveFromList(index)}
                    sx={{
                        cursor: 'pointer',
                        padding: '2px 7px',
                        '&:hover': { backgroundColor: '#E8F5E9' },
                    }}
                >
                    <ListItemText
                        primary={product.producto}
                        secondary={`Precio: $${product.precio_venta}`}
                        primaryTypographyProps={{
                            fontSize: '0.7rem',
                            fontWeight: 'normal',
                            color: '#388E3C',
                        }}
                        secondaryTypographyProps={{
                            fontSize: '0.7rem',
                            color: '#616161',
                            fontWeight: 'bold',
                            

                        }}
                    />
                </ListItem>
            ))}
        </List>
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ textAlign: 'center' }}>
            Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 0.7,
            }}
        >
            <Button
                variant="contained"
                color="error"

                onClick={handleClearList}
                sx={{ flex: '0 0 48%' ,
                    background: 'linear-gradient(to right,rgb(147, 197, 179),rgb(212, 178, 138))' 
                }}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handlePrintList}
                startIcon={<PrintIcon />}
                sx={{ flex: '0 0 48%',
                    background: 'linear-gradient(to right,rgb(150, 199, 181),rgba(30, 155, 62, 0.81))' 
                 }}
            >
                Imprimir
            </Button>
        </Box>
    </Box>
</Drawer>


            {/* Contenido principal dinámico */}
            <Box
                sx={{
                    flexGrow: 1,
                    transition: 'margin-left 0.3s ease',
                    marginLeft: isDrawerOpen ? '300px' : '0',
                }}
            >
                <AppBar
                    position="static"
                    sx={{ background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)' }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleToggleDrawer}
                            sx={{ marginRight: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'normal',
                                color: '#388E3C',
                                letterSpacing: 3,
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                fontSize: '2em',
                                fontFamily: 'Onest, segoe ui',
                            }}
                        >
                            FLORA - Rico y Sano
                        </Typography>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Resto del contenido */}
                <Box sx={{ padding: 3 }}>
                    {/* Campos de búsqueda y filtro */}
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                        <TextField
                            label="Buscar producto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Select
                            value={selectedCategoria}
                            onChange={(e) => setSelectedCategoria(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <MenuItem value="">Todas las Categorías</MenuItem>
                            {[...new Set(productos.map((p) => p.categoria))].map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {/* Botón Agregar Producto y Contador */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenPanel('add')}
                            sx={{
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                                background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                                letterSpacing: 0.8,
                                textShadow: '2px 3px 3px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #DCEDC8, #A8E6CF)',
                                },
                            }}
                        >
                            Agregar Producto
                        </Button>
                        <Typography variant="subtitle1" sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                            Total Productos: {filteredProductos.length}
                        </Typography>
                    </Box>

                    {/* Tabla de productos */}
                    <Fade in={showTable}>
                        <TableContainer
                            component={Paper}
                            sx={{ marginTop: 3, borderRadius: 2 }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                                            letterSpacing: 1,
                                            textShadow: '1px 2px 2px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Producto
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Stock
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Precio Venta
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Precio Costo
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Precio Sugerido
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Categoría
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Fecha Modificación
                                        </TableCell>
                                        <TableCell sx={{ color: '#388E3C', fontWeight: 'bold' }}>
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProductos.map((producto, index) => (
                                        <TableRow
                                            key={producto.id}
                                            hover
                                            onDoubleClick={() => handleAddToList(producto)}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#E8F5E9',
                                                },
                                            }}
                                        >
                                            <TableCell>{producto.producto}</TableCell>
                                            <TableCell>{producto.stock}</TableCell>
                                            <TableCell>${producto.precio_venta}</TableCell>
                                            <TableCell>${producto.precio_costo}</TableCell>
                                            <TableCell>${producto.precio_sugerido}</TableCell>
                                            <TableCell>{producto.categoria}</TableCell>
                                            <TableCell>{producto.fecha_modificacion}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    onClick={() => handleOpenPanel('edit', producto)}
                                                    sx={{ marginRight: 1, color: '#388E3C' }}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="text"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDeleteProduct(producto.id)}
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

                    {/* Panel de Producto */}
                    <ProductPanel
                        isOpen={openPanel}
                        onClose={handleClosePanel}
                        type={panelType}
                        onAction={
                            panelType === 'add' ? handleAddProduct : handleUpdateProduct
                        }
                        producto={productoSeleccionado}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ProductsPage;
