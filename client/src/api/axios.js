import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://asesoratec.onrender.com/api',
    withCredentials: true
})

export default instance