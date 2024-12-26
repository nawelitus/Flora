import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
    baseURL: 'http://190.14.32.117:3001/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
