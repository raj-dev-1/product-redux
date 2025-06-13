import axios from "axios";

export const BASE_URL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL, 
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
