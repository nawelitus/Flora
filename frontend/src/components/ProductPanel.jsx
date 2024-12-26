// AddProductForm.jsx and EditProductForm.jsx with Sliding Panel

import React, { useState, useEffect } from "react";
import {
	Drawer,
	Box,
	Button,
	Typography,
	Grid,
	TextField,
} from "@mui/material";

// AddProductForm Component
function AddProductForm({ onAddProduct, onClose }) {
	const [producto, setProducto] = useState("");
	const [stock, setStock] = useState(0);
	const [unidadesStock, setUnidadesStock] = useState("");
	const [precioVenta, setPrecioVenta] = useState(0);
	const [precioCosto, setPrecioCosto] = useState(0);
	const [precioSugerido, setPrecioSugerido] = useState(0);
	const [incremento, setIncremento] = useState(0);
	const [categoria, setCategoria] = useState("");
	const [subCategoria, setSubCategoria] = useState("");

	useEffect(() => {
		if (incremento && precioCosto) {
			const nuevoPrecioSugerido =
				parseFloat(precioCosto) +
				parseFloat(precioCosto) * (parseFloat(incremento) / 100);
			setPrecioSugerido(nuevoPrecioSugerido.toFixed(2));
			const nuevoPrecioVenta = precioSugerido;
			setPrecioVenta(nuevoPrecioSugerido.toFixed(2)); //nuevoPrecioVenta.toFixed(2));
		}
	}, [incremento, precioCosto]);

	const handleSubmit = (e) => {
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
		onClose();
	};

	return (
		<Box
			sx={{
				width: 400,
				p: 4,
				background: "linear-gradient(to right, #A8E6CF, #DCEDC8)",
				borderRadius: 3,
				boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
			}}
		>
			<Typography
				variant="h6"
				gutterBottom
				sx={{
					color: "#388E3C",
					fontFamily: "Onest, sans-serif",
					textAlign: "center",
					textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
				}}
			>
				Agregar Producto
			</Typography>
			<Box component="form" onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							label="Producto"
							fullWidth
							required
							value={producto}
							onChange={(e) => setProducto(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Precio Costo"
							fullWidth
							required
							type="number"
							value={precioCosto}
							onChange={(e) => setPrecioCosto(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Incremento"
							fullWidth
							type="number"
							value={incremento}
							onChange={(e) => setIncremento(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Precio Venta"
							fullWidth
							required
							type="number"
							value={precioVenta}
							onChange={(e) => setPrecioVenta(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
							InputProps={{ readOnly: false }}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							label="Precio Sugerido"
							fullWidth
							type="number"
							value={precioSugerido}
							onChange={(e) => setPrecioSugerido(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
							InputProps={{ readOnly: true }}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							label="Stock"
							fullWidth
							required
							type="number"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Unidades Stock"
							fullWidth
							required
							value={unidadesStock}
							onChange={(e) => setUnidadesStock(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Categoría"
							fullWidth
							value={categoria}
							onChange={(e) => setCategoria(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Subcategoría"
							fullWidth
							value={subCategoria}
							onChange={(e) => setSubCategoria(e.target.value)}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
					<Button
						onClick={onClose}
						variant="outlined"
						sx={{
							color: "#388E3C",
							borderColor: "#388E3C",
							borderRadius: 1,
							"&:hover": { backgroundColor: "#A5D6A7" },
						}}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						sx={{
							borderRadius: 1,
							background: "linear-gradient(to right, #A8E6CF, #DCEDC8)",
							"&:hover": {
								background: "linear-gradient(to right, #DCEDC8, #A8E6CF)",
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

// EditProductForm Component
function EditProductForm({ producto, onUpdateProduct, onClose }) {
	const [productoEditado, setProductoEditado] = useState({ ...producto });

	useEffect(() => {
		if (productoEditado.incremento && productoEditado.precio_costo) {
			const nuevoPrecioSugerido =
				parseFloat(productoEditado.precio_costo) +
				parseFloat(productoEditado.precio_costo) *
					parseFloat(productoEditado.incremento / 100);
			setProductoEditado((prev) => ({
				...prev,
				precio_sugerido: nuevoPrecioSugerido.toFixed(2),
			}));
		}
		const nuevoPrecioVenta = 	parseFloat(productoEditado.precio_costo) +
		parseFloat(productoEditado.precio_costo) *
			parseFloat(productoEditado.incremento / 100);
		setProductoEditado((prev) => ({
			...prev,
			precio_venta: nuevoPrecioVenta.toFixed(2),
		}));
	}, [productoEditado.incremento, productoEditado.precio_costo]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductoEditado((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdateProduct(productoEditado);
		onClose();
	};

	return (
		<Box
			sx={{
				width: 400,
				p: 4,
				background: "linear-gradient(to right, #A8E6CF, #DCEDC8)",
				borderRadius: 3,
				boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
			}}
		>
			<Typography
				variant="h6"
				gutterBottom
				sx={{
					color: "#388E3C",
					fontFamily: "Onest, sans-serif",
					textAlign: "center",
					textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
				}}
			>
				Editar Producto
			</Typography>
			<Box component="form" onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							label="Producto"
							name="producto"
							fullWidth
							required
							value={productoEditado.producto}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Precio Costo"
							name="precio_costo"
							fullWidth
							required
							type="number"
							value={productoEditado.precio_costo}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Incremento"
							name="incremento"
							fullWidth
							type="number"
							value={productoEditado.incremento}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Precio Venta"
							name="precio_venta"
							fullWidth
							required
							type="number"
							value={productoEditado.precio_venta}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
							InputProps={{ readOnly: false }}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							label="Precio Sugerido"
							name="precio_sugerido"
							fullWidth
							type="number"
							value={productoEditado.precio_sugerido}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
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
							value={productoEditado.stock}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Unidades Stock"
							name="unidades_stock"
							fullWidth
							required
							value={productoEditado.unidades_stock}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Categoría"
							name="categoria"
							fullWidth
							value={productoEditado.categoria}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Subcategoría"
							name="sub_categoria"
							fullWidth
							value={productoEditado.sub_categoria}
							onChange={handleChange}
							sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
					<Button
						onClick={onClose}
						variant="outlined"
						sx={{
							color: "#388E3C",
							borderColor: "#388E3C",
							borderRadius: 1,
							"&:hover": { backgroundColor: "#A5D6A7" },
						}}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						sx={{
							borderRadius: 1,
							background: "linear-gradient(to right, #A8E6CF, #DCEDC8)",
							"&:hover": {
								background: "linear-gradient(to right, #DCEDC8, #A8E6CF)",
							},
						}}
					>
						Guardar
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export { AddProductForm, EditProductForm };

// Sliding Panel Logic
function ProductPanel({ isOpen, onClose, type, onAction, producto }) {
	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			{type === "add" && (
				<AddProductForm onAddProduct={onAction} onClose={onClose} />
			)}
			{type === "edit" && (
				<EditProductForm
					producto={producto}
					onUpdateProduct={onAction}
					onClose={onClose}
				/>
			)}
		</Drawer>
	);
}

export default ProductPanel;
