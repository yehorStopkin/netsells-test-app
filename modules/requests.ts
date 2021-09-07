import axios from 'axios';

const service = axios.create({
    timeout: 60000,
});

// Request interceptors
service.interceptors.request.use(
    config => config,

    error => {
        Promise.reject(error);
    },
);

// Response interceptors
service.interceptors.response.use(
    (response) => {
        const responseStatus = Number(response.status);

        if (responseStatus >= 200 && responseStatus < 300 ) {
            return response.data;
        }

        return Promise.reject(new Error(response.data.message));
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default service;
