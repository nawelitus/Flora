import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UsersPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            {/* Aquí agregaremos la funcionalidad de usuarios */}
        </div>
    );
}

export default UsersPage;
