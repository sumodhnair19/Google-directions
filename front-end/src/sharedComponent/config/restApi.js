import axios from 'axios';

export const API = {
    route: 'route'
};

const baseURL = 'http://localhost:3001';

const axiosInstance =  axios.create({baseURL});

export {axiosInstance};
