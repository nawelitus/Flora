import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';

function LoginPage() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://190.14.32.117:3001/api/auth/login', { usuario, password });
            const { token } = response.data;

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', token);

            // Redirigir a la página de productos
            navigate('/productos');
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: '400px',
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#388E3C' }}>
                    Iniciar Sesión
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Usuario"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                    />
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            padding: '10px 20px',
                            borderRadius: 2,
                            background: 'linear-gradient(to right, #A8E6CF, #DCEDC8)',
                            '&:hover': { background: 'linear-gradient(to right, #DCEDC8, #A8E6CF)' },
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default LoginPage;
