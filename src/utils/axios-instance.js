import axios from 'axios';

const axiosInstance = await axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

export default axiosInstance;
