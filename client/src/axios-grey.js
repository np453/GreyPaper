import axios from 'axios';
const instance = axios.create({

    // Base Domain Name

    //baseURL: 'https://greypaper.in/api/'
    baseURL: 'http://127.0.0.1:6161/'

});

//export let base = 'https://greypaper.in';
export let base = 'http://localhost:6161/';

export default instance;