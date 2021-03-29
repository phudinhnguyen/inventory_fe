import axios from 'axios';
import { getAccountInfo } from './account';

const client = axios.create();

client.interceptors.request.use(config => {
    const accountInfo = getAccountInfo()
    if (accountInfo) {
        config.headers.Authorization = `Bearer ${accountInfo.loginSession.mToken}`;
    }
    return config;
});

export default client;