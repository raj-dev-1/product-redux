import axios from "axios";

export const BASE_URL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL, 
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const protectedRoutes = ['/protected-route1', '/secure/data']; 
    const isProtected = protectedRoutes.some(route => config.url?.includes(route));

    if (token && isProtected) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
