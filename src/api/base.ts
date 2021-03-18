import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

client.interceptors.request.use(config => {
    const session = window.localStorage.getItem('session');
    if (session) {
        const loginInfo = JSON.parse(session);
        config.headers.Authorization = `Bearer ${ loginInfo.token }`;
    }
    return config;
});

export default client;
