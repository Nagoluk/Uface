import axios from 'axios';

const DEBUG = process.env.NODE_ENV === 'development';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '412c8d28-b10e-4666-9818-7ae2e9743b00',
    }
})

instance.interceptors.request.use((config) => {
    /** In dev, intercepts request and logs it into console for dev */
    if (DEBUG) {
        //console.info("✉️ ", config);
    }
    return config;
}, (error) => {
    if (DEBUG) {
        console.error('✉️ ', error);
    }
    return Promise.reject(error);
});




