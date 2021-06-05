import axios from 'axios';

const url = process.env.BASE_URL;

const api = axios.create({
    baseURL: url
});

export default api;