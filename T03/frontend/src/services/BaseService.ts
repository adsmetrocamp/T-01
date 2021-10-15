import axios from 'axios';
import { AuthProvider } from '../contexts/AuthContext';

const baseURL = 'http://localhost:8080';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
    if (AuthProvider.userData) {
        config.headers['X-User-Id'] = AuthProvider.userData.id;
    }

    return config;
}, Promise.reject);
