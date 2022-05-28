import axios from 'axios';
import logout from '../auth/auth.js'
// @ts-ignore
import { toast } from 'react-toastify';


const BASE_URL = 'http://localhost:8080'

const authInstance = axios.create({
    baseURL: BASE_URL,
})

axios.interceptors.request.use((config) => {
    config.url = "".concat(BASE_URL, config.url);
    console.log(config)
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    console.log(response)
    if(response.data.responseMessage !== undefined || response.data.responseMessage !== null) {
        toast.success(response.data.responseMessage);
    }
    return response;

}, (error) => {
    if (error.response.status.includes([401, 403])) {
        logout();
        toast.error('Your session has expired');
        return Promise.reject(error);
    }
    console.log(error.response.status,  error.response.data);
    toast.error( error.response.data.message? error.response.data.message : 'An error occured');
    return Promise.reject(error)
   
});


authInstance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    else logout();
    return config
}, (error) => {
    
    
    console.log('an error occured requesting this resource', error);
    return Promise.reject(error);
})

authInstance.interceptors.response.use((response) => {
    console.log(response)
    if(response.data.responseMessage !== undefined || response.data.responseMessage !== null) {
        toast.success(response.data.responseMessage);
    }
    return response;
}, (error) => {
    if (error.response.status.includes([401, 403])) {
        logout();
        toast.error('Your session has expired');
        return Promise.reject(error);
    }
    console.log('an error occured', error.response.data)
    toast.error('An error occured, ' + error.response.data.message);

    return Promise.reject(error);
})


export default authInstance;