import axios from 'axios';

const DEBUG = process.env.NODE_ENV === 'development';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9b1ed003-d374-49c4-a5a6-e095c440ccd1',
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




