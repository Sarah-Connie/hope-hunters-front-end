import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5001';

export default axios.create({
        baseURL: BASE_URL
    });