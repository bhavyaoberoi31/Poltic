import axios from 'axios';


// const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (!baseURL) {
    throw new Error('VITE_SERVER_URL is not defined in the environment variables.');
}

const servicesAxiosInstance = axios.create({
    baseURL: baseURL
});

servicesAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    servicesAxiosInstance
};
